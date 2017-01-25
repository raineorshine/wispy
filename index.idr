--Loc : Nat -> Nat -> Type
--Loc start end = (Nat, Nat)

--data Loc a = Nat -> Nat -> Type

{-
record Loc where
  constructor NewLoc
  start : Nat
  end : Nat

Loc : Type
Loc = (Nat, Nat)

NewLoc : Nat -> Nat -> (Nat, Nat)
NewLoc start end = (start, end)
-}

-- CONSTANTS -----------------------------------

INDENT : String
INDENT = "  "

-- DATA TYPES ----------------------------------

Loc : Type
Loc = (Nat, Nat)

data Node : Type where
  Text : String -> Loc -> Node
  Block : List Node -> Loc -> Node

data AST : Type where
  Document : List Node -> Loc -> AST

data Action =
  Insert Nat String

-- FUNCTIONS ------------------------------------

parse : String -> AST

renderWispy : AST -> String
renderWispy (Document rootNodes _) = concat (map renderNode rootNodes) where
  renderNode : Node -> String
  renderNode (Text value _) = value
  renderNode (Block nodes _) = INDENT ++ concat (map renderNode nodes)

renderJs : AST -> String -> String

-- incomplete
substring : String -> Nat -> Nat -> String
substring str Z Z = ""
substring str Z (S end) = case unpack str of
  (c :: cs) => pack [c] ++ substring (pack cs) Z end
substring str (S start) (S end) = case unpack str of
  (c :: cs) => substring (pack cs) start end

-- how do I prove that pos is greater than start?
-- incomplete
safeSubtract : Nat -> Nat -> Nat
safeSubtract x Z = x
safeSubtract (S x) (S y) = safeSubtract x y

insert : Node -> String -> Nat -> String
insert (Text nodeValue (start, end)) insertValue pos =
  let insertPos = safeSubtract pos start in
  let first = substring nodeValue 0 insertPos in
  let last = substring nodeValue insertPos (length nodeValue) in
  first ++ insertValue ++ last

edit : AST -> Action -> AST
edit (Document rootNodes loc) action =
  --let pos = (case action of
  --  Insert position value => position) in
  Document (map editNode rootNodes) loc where
    nodeLoc : Node -> Loc
    nodeLoc node = case node of
      Text _ loc => loc
      Block _ loc => loc

    editNode : Node -> Node
    editNode node =
      let (start, end) = nodeLoc node in
      case action of
        Insert actionStart actionValue =>
          let inNode = actionStart >= start && actionStart < end in
          case node of
            Text nodeValue loc => Text (if inNode then insert node actionValue actionStart else nodeValue) loc
            Block nodes loc => Block (if inNode then (map editNode nodes) else nodes) loc

-- MAIN ------------------------------------

sample : AST
sample = Document
  [
    Text "aaa" (0, 3),
    Block [
      Text "bbbbb" (4, 9)
    ] (4, 9),
    Text "ccc\n" (10, 14)
  ]
  (0, 14)

sampleInsert : Action
sampleInsert = Insert 5 "!!!"

--renderWispy sample
--renderWispy (edit sample sampleInsert)

