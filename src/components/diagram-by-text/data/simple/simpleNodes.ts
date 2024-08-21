import { Node } from "@xyflow/react";

export const simpleNodes: Node[] = [
  {
    id: "owner",
    type: "tables",
    data: {
      name: "owner",
      renderType: "table",
      className:
        "!bg-brandHover p-1 px-2 relative flex justify-between items-center h-10 text-white font-semibold ml-[136px]",
    },
    position: {
      x: 992,
      y: 96,
    },
    measured: {
      width: 360,
      height: 32,
    },
    dragging: false,
    selected: false,
  },
  {
    id: "animal",
    type: "tables",
    data: {
      name: "animal",
      renderType: "table",
      className:
        "!bg-brandHover p-1 px-2 relative flex justify-between items-center h-10 text-white font-semibold ml-[136px]",
    },
    position: {
      x: 672,
      y: 128,
    },
    measured: {
      width: 360,
      height: 32,
    },
    dragging: false,
    selected: false,
  },
  {
    id: "case",
    type: "tables",
    data: {
      name: "case",
      renderType: "table",
      className:
        "!bg-brandHover p-1 px-2 relative flex justify-between items-center h-10 text-white font-semibold ml-[136px]",
    },
    position: {
      x: 608,
      y: -224,
    },
    measured: {
      width: 360,
      height: 32,
    },
    dragging: false,
    selected: false,
  },
  {
    id: "status",
    type: "tables",
    data: {
      name: "status",
      renderType: "table",
      className:
        "!bg-brandHover p-1 px-2 relative flex justify-between items-center h-10 text-white font-semibold ml-[136px]",
    },
    position: {
      x: 288,
      y: -384,
    },
    measured: {
      width: 360,
      height: 32,
    },
    dragging: false,
    selected: false,
  },
  {
    id: "vaccine",
    type: "tables",
    data: {
      name: "vaccine",
      renderType: "table",
      className:
        "!bg-brandHover p-1 px-2 relative flex justify-between items-center h-10 text-white font-semibold ml-[136px]",
    },
    position: {
      x: -96,
      y: 32,
    },
    measured: {
      width: 360,
      height: 32,
    },
    dragging: false,
    selected: false,
  },
  {
    id: "animal_vaccine",
    type: "tables",
    data: {
      name: "animal_vaccine",
      renderType: "table",
      className:
        "!bg-brandHover p-1 px-2 relative flex justify-between items-center h-10 text-white font-semibold ml-[136px]",
    },
    position: {
      x: 320,
      y: 192,
    },
    measured: {
      width: 360,
      height: 32,
    },
    dragging: false,
    selected: true,
  },
  {
    id: "address",
    type: "tables",
    data: {
      name: "address",
      renderType: "table",
      className:
        "!bg-brandHover p-1 px-2 relative flex justify-between items-center h-10 text-white font-semibold ml-[136px]",
    },
    position: {
      x: 96,
      y: -288,
    },
    measured: {
      width: 360,
      height: 32,
    },
    dragging: false,
    selected: false,
  },
  {
    id: "owner.ownerId",
    type: "tables",
    position: {
      x: 136,
      y: 32,
    },
    extent: "parent",
    parentId: "owner",
    data: {
      name: "ownerId",
      dataType: "Int",
      constrains: "Primary,AutoIncrement",
      renderType: "property",
      className: "p-1 px-2 relative flex justify-between h-16 z-8 nodrag",
      type: "property",
    },
    measured: {
      width: 224,
      height: 32,
    },
  },
  {
    id: "owner.firstName",
    type: "tables",
    position: {
      x: 136,
      y: 64,
    },
    extent: "parent",
    parentId: "owner",
    data: {
      name: "firstName",
      dataType: "Varchar",
      constrains: "Unique,NotNull",
      renderType: "property",
      className: "p-1 px-2 relative flex justify-between h-16 z-8 nodrag",
      type: "property",
    },
    measured: {
      width: 224,
      height: 32,
    },
  },
  {
    id: "owner.lastName",
    type: "tables",
    position: {
      x: 136,
      y: 96,
    },
    extent: "parent",
    parentId: "owner",
    data: {
      name: "lastName",
      dataType: "Varchar",
      constrains: "",
      renderType: "property",
      className: "p-1 px-2 relative flex justify-between h-16 z-8 nodrag",
      type: "property",
    },
    measured: {
      width: 224,
      height: 32,
    },
  },
  {
    id: "owner.phonenumber",
    type: "tables",
    position: {
      x: 136,
      y: 128,
    },
    extent: "parent",
    parentId: "owner",
    data: {
      name: "phonenumber",
      dataType: "Varchar",
      constrains: "NotNull",
      renderType: "property",
      className: "p-1 px-2 relative flex justify-between h-16 z-8 nodrag",
      type: "property",
    },
    measured: {
      width: 224,
      height: 32,
    },
  },
  {
    id: "animal.animalId",
    type: "tables",
    position: {
      x: 136,
      y: 32,
    },
    extent: "parent",
    parentId: "animal",
    data: {
      name: "animalId",
      dataType: "Int",
      constrains: "Primary,AutoIncrement",
      renderType: "property",
      className: "p-1 px-2 relative flex justify-between h-16 z-8 nodrag",
      type: "property",
    },
    measured: {
      width: 224,
      height: 32,
    },
  },
  {
    id: "animal.ownerId",
    type: "tables",
    position: {
      x: 136,
      y: 64,
    },
    extent: "parent",
    parentId: "animal",
    data: {
      name: "ownerId",
      dataType: "Int",
      constrains: "NotNull",
      renderType: "property",
      className: "p-1 px-2 relative flex justify-between h-16 z-8 nodrag",
      type: "property",
    },
    measured: {
      width: 224,
      height: 32,
    },
  },
  {
    id: "animal.name",
    type: "tables",
    position: {
      x: 136,
      y: 96,
    },
    extent: "parent",
    parentId: "animal",
    data: {
      name: "name",
      dataType: "Char",
      constrains: "NotNull",
      renderType: "property",
      className: "p-1 px-2 relative flex justify-between h-16 z-8 nodrag",
      type: "property",
    },
    measured: {
      width: 224,
      height: 32,
    },
  },
  {
    id: "animal.species",
    type: "tables",
    position: {
      x: 136,
      y: 128,
    },
    extent: "parent",
    parentId: "animal",
    data: {
      name: "species",
      dataType: "Char",
      constrains: "NotNull",
      renderType: "property",
      className: "p-1 px-2 relative flex justify-between h-16 z-8 nodrag",
      type: "property",
    },
    measured: {
      width: 224,
      height: 32,
    },
  },
  {
    id: "animal.notes",
    type: "tables",
    position: {
      x: 136,
      y: 160,
    },
    extent: "parent",
    parentId: "animal",
    data: {
      name: "notes",
      dataType: "Varchar",
      constrains: "",
      renderType: "property",
      className: "p-1 px-2 relative flex justify-between h-16 z-8 nodrag",
      type: "property",
    },
    measured: {
      width: 224,
      height: 32,
    },
  },
  {
    id: "case.id",
    type: "tables",
    position: {
      x: 136,
      y: 32,
    },
    extent: "parent",
    parentId: "case",
    data: {
      name: "id",
      dataType: "Int",
      constrains: "Primary,AutoIncrement",
      renderType: "property",
      className: "p-1 px-2 relative flex justify-between h-16 z-8 nodrag",
      type: "property",
    },
    measured: {
      width: 224,
      height: 32,
    },
  },
  {
    id: "case.animalId",
    type: "tables",
    position: {
      x: 136,
      y: 64,
    },
    extent: "parent",
    parentId: "case",
    data: {
      name: "animalId",
      dataType: "Int",
      constrains: "NotNull",
      renderType: "property",
      className: "p-1 px-2 relative flex justify-between h-16 z-8 nodrag",
      type: "property",
    },
    measured: {
      width: 224,
      height: 32,
    },
  },
  {
    id: "case.statusId",
    type: "tables",
    position: {
      x: 136,
      y: 96,
    },
    extent: "parent",
    parentId: "case",
    data: {
      name: "statusId",
      dataType: "Int",
      constrains: "NotNull",
      renderType: "property",
      className: "p-1 px-2 relative flex justify-between h-16 z-8 nodrag",
      type: "property",
    },
    measured: {
      width: 224,
      height: 32,
    },
  },
  {
    id: "case.addressId",
    type: "tables",
    position: {
      x: 136,
      y: 128,
    },
    extent: "parent",
    parentId: "case",
    data: {
      name: "addressId",
      dataType: "Varchar",
      constrains: "",
      renderType: "property",
      className: "p-1 px-2 relative flex justify-between h-16 z-8 nodrag",
      type: "property",
    },
    measured: {
      width: 224,
      height: 32,
    },
  },
  {
    id: "status.statusId",
    type: "tables",
    position: {
      x: 136,
      y: 32,
    },
    extent: "parent",
    parentId: "status",
    data: {
      name: "statusId",
      dataType: "Int",
      constrains: "Primary,AutoIncrement",
      renderType: "property",
      className: "p-1 px-2 relative flex justify-between h-16 z-8 nodrag",
      type: "property",
    },
    measured: {
      width: 224,
      height: 32,
    },
  },
  {
    id: "status.type",
    type: "tables",
    position: {
      x: 136,
      y: 64,
    },
    extent: "parent",
    parentId: "status",
    data: {
      name: "type",
      dataType: "Varchar",
      constrains: "NotNull",
      renderType: "property",
      className: "p-1 px-2 relative flex justify-between h-16 z-8 nodrag",
      type: "property",
    },
    measured: {
      width: 224,
      height: 32,
    },
  },
  {
    id: "vaccine.vaccineId",
    type: "tables",
    position: {
      x: 136,
      y: 32,
    },
    extent: "parent",
    parentId: "vaccine",
    data: {
      name: "vaccineId",
      dataType: "Int",
      constrains: "Primary,AutoIncrement",
      renderType: "property",
      className: "p-1 px-2 relative flex justify-between h-16 z-8 nodrag",
      type: "property",
    },
    measured: {
      width: 224,
      height: 32,
    },
  },
  {
    id: "vaccine.type",
    type: "tables",
    position: {
      x: 136,
      y: 64,
    },
    extent: "parent",
    parentId: "vaccine",
    data: {
      name: "type",
      dataType: "Varchar",
      constrains: "NotNull",
      renderType: "property",
      className: "p-1 px-2 relative flex justify-between h-16 z-8 nodrag",
      type: "property",
    },
    measured: {
      width: 224,
      height: 32,
    },
  },
  {
    id: "vaccine.description",
    type: "tables",
    position: {
      x: 136,
      y: 96,
    },
    extent: "parent",
    parentId: "vaccine",
    data: {
      name: "description",
      dataType: "Varchar",
      constrains: "",
      renderType: "property",
      className: "p-1 px-2 relative flex justify-between h-16 z-8 nodrag",
      type: "property",
    },
    measured: {
      width: 224,
      height: 32,
    },
  },
  {
    id: "animal_vaccine.vaccineId",
    type: "tables",
    position: {
      x: 136,
      y: 32,
    },
    extent: "parent",
    parentId: "animal_vaccine",
    data: {
      name: "vaccineId",
      dataType: "Int",
      constrains: "Primary,AutoIncrement",
      renderType: "property",
      className: "p-1 px-2 relative flex justify-between h-16 z-8 nodrag",
      type: "property",
    },
    measured: {
      width: 224,
      height: 32,
    },
  },
  {
    id: "animal_vaccine.animalId",
    type: "tables",
    position: {
      x: 136,
      y: 64,
    },
    extent: "parent",
    parentId: "animal_vaccine",
    data: {
      name: "animalId",
      dataType: "Int",
      constrains: "Primary",
      renderType: "property",
      className: "p-1 px-2 relative flex justify-between h-16 z-8 nodrag",
      type: "property",
    },
    measured: {
      width: 224,
      height: 32,
    },
  },
  {
    id: "address.addressId",
    type: "tables",
    position: {
      x: 136,
      y: 32,
    },
    extent: "parent",
    parentId: "address",
    data: {
      name: "addressId",
      dataType: "Int",
      constrains: "Primary,AutoIncrement",
      renderType: "property",
      className: "p-1 px-2 relative flex justify-between h-16 z-8 nodrag",
      type: "property",
    },
    measured: {
      width: 224,
      height: 32,
    },
  },
  {
    id: "address.country",
    type: "tables",
    position: {
      x: 136,
      y: 64,
    },
    extent: "parent",
    parentId: "address",
    data: {
      name: "country",
      dataType: "Char",
      constrains: "NotNull",
      renderType: "property",
      className: "p-1 px-2 relative flex justify-between h-16 z-8 nodrag",
      type: "property",
    },
    measured: {
      width: 224,
      height: 32,
    },
  },
  {
    id: "address.city",
    type: "tables",
    position: {
      x: 136,
      y: 96,
    },
    extent: "parent",
    parentId: "address",
    data: {
      name: "city",
      dataType: "Char",
      constrains: "NotNull",
      renderType: "property",
      className: "p-1 px-2 relative flex justify-between h-16 z-8 nodrag",
      type: "property",
    },
    measured: {
      width: 224,
      height: 32,
    },
  },
  {
    id: "address.ward",
    type: "tables",
    position: {
      x: 136,
      y: 128,
    },
    extent: "parent",
    parentId: "address",
    data: {
      name: "ward",
      dataType: "Char",
      constrains: "",
      renderType: "property",
      className: "p-1 px-2 relative flex justify-between h-16 z-8 nodrag",
      type: "property",
    },
    measured: {
      width: 224,
      height: 32,
    },
  },
  {
    id: "address.describe",
    type: "tables",
    position: {
      x: 136,
      y: 160,
    },
    extent: "parent",
    parentId: "address",
    data: {
      name: "describe",
      dataType: "Varchar",
      constrains: "",
      renderType: "property",
      className: "p-1 px-2 relative flex justify-between h-16 z-8 nodrag",
      type: "property",
    },
    measured: {
      width: 224,
      height: 32,
    },
  },
];
