const blocktree = require('blocktree')

/** Remove all keys with null and undefined values from an object. */
function compact (obj) {
  const o = {}
  for (let prop in obj) {
    if(obj[prop] != null) {
      o[prop] = obj[prop]
    }
  }
  return o
}

function renderWispy (ast) {

  // TODO: Smarter handling of src indentation
  function shorten (str) {
    return str.trimRight()
  }

  const indent = '  '
  return (
    ast.type === 'document' ? ast.children.map(renderWispy).join('') :
    ast.type === 'block' ? shorten(indent + ast.children.map(renderWispy).join('')) :
    ast.type === 'text' ? ast.value :
    null
  )

  // function reducer(ast, acc) {
  //   return !ast.children
  //     ? { text: acc.text + ast.value, blocks: acc.blocks.concat(ast.blocks), loc: ast.loc }
  //     : ast.children.map(child => reducer(child, acc))
  // }

  // return reducer(ast, { text: '', blocks: [] })
}

function renderJs (ast) {
  return (
    ast.type === 'document' ? ast.children.map(renderJs).join('') :
    ast.type === 'block' ? '{' + ast.children.map(renderJs).join('') + '}' :
    ast.type === 'text' ? ast.value :
    null
  )
}

const editReducer = {}

editReducer.insert = (node, action) => {
  const first = node.value.slice(0, action.loc.start - node.loc.start)
  const last = node.value.slice(action.loc.start - node.loc.start)
  return first + action.value + last
}

/** Given an ast describing the location of blocks in a wispy text, apply the action and return the new ast.
NOTE: Technically the wispy text is redundant since it is derivable from the ast, but presumably the action was produced from the wispy text and thus it can be passed through for performance.
*/
function edit (ast, wispy, action) {

  const inBlock = action.loc.start >= ast.loc.start && action.loc.start < ast.loc.end
  const inNode = inBlock && ast.type === 'text'

  return compact({
    type: ast.type,
    value: inNode
      ? editReducer[action.type](ast, action)
      : ast.value,
    loc: ast.loc,
    children: ast.children && inBlock ?
      ast.children.map(child => edit(child, wispy, action))
      : ast.children
  })
}

function parse (input) {

  const ast = blocktree(input, {
    open: '{',
    close: '}'
  })
  const text = renderWispy(ast)

  return { ast, text }
}

module.exports = {
  parse,
  renderWispy,
  renderJs,
  edit
}
