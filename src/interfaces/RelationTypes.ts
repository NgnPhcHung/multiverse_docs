export enum RelationType {
  "one-to-one" = "(1:1)", //one to one
  "one-to-many" = "(1:n)", //one to many
  "many-to-one" = "(n:1)", //many to one
  "many-to-many" = "(m:n)", //many to many
}
export enum RelationTypePlainText {
  "one-to-one" = "One to One", //one to one
  "one-to-many" = "One to Many", //one to many
  "many-to-one" = "Many to One", //many to one
  "many-to-many" = "Many to Many", //many to many
}
export enum RelationPlain {
  "--" = "one-to-one", //one to one
  "<<" = "one-to-many", //one to many
  ">>" = "many-to-one", //many to one
  "<>" = "many-to-many", //many to many
}
