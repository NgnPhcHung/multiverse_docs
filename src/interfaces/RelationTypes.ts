export enum RelationType {
  "--" = "(1:1)", //one to one
  "<<" = "(1:n)", //one to many
  ">>" = "(n:1)", //many to one
  "<>" = "(m:n)", //many to many
}
