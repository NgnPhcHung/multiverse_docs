import { Edge } from "@xyflow/react";

export const simpleEdges: Edge[] = [
  {
    id: "owner.ownerId-animal.ownerId",
    source: "owner.ownerId",
    target: "animal.ownerId",
    sourceHandle: "owner.ownerId",
    targetHandle: "animal.ownerId",
    type: "floating",
    data: {
      label: "(n:1)",
    },
  },
  {
    id: "case.animalId-animal.animalId",
    source: "case.animalId",
    target: "animal.animalId",
    sourceHandle: "case.animalId",
    targetHandle: "animal.animalId",
    type: "floating",
    data: {
      label: "(n:1)",
    },
  },
  {
    id: "case.statusId-status.statusId",
    source: "case.statusId",
    target: "status.statusId",
    sourceHandle: "case.statusId",
    targetHandle: "status.statusId",
    type: "floating",
    data: {
      label: "(1:1)",
    },
  },
  {
    id: "case.addressId-address.addressId",
    source: "case.addressId",
    target: "address.addressId",
    sourceHandle: "case.addressId",
    targetHandle: "address.addressId",
    type: "floating",
    data: {
      label: "(1:n)",
    },
  },
  {
    id: "animal_vaccine.vaccineId-vaccine.vaccineId",
    source: "animal_vaccine.vaccineId",
    target: "vaccine.vaccineId",
    sourceHandle: "animal_vaccine.vaccineId",
    targetHandle: "vaccine.vaccineId",
    type: "floating",
    data: {
      label: "(1:n)",
    },
  },
  {
    id: "animal_vaccine.animalId-animal.animalId",
    source: "animal_vaccine.animalId",
    target: "animal.animalId",
    sourceHandle: "animal_vaccine.animalId",
    targetHandle: "animal.animalId",
    type: "floating",
    data: {
      label: "(1:n)",
    },
  },
];
