export const simpleEditorContent = `
Create owner ( 
  ownerId: Int  Primary AutoIncrement,
  firstName: Varchar Unique NotNull,
  lastName: Varchar,
  phonenumber: Varchar NotNull,
)

Create animal ( 
  animalId: Int Primary AutoIncrement,
  ownerId: Int NotNull,
  name: Char NotNull,
  species: Char NotNull,
  notes: Varchar,
)

Create case ( 
  id: Int Primary AutoIncrement,
  animalId: Int NotNull,
  statusId: Int NotNull,
  addressId: Varchar
)

Create status ( 
  statusId: Int Primary AutoIncrement,
  type: Varchar NotNull,
)


Create vaccine ( 
  vaccineId: Int Primary AutoIncrement,
  type: Varchar NotNull,
  description: Varchar,
)


Create animal_vaccine ( 
  vaccineId: Int Primary AutoIncrement [relate to vaccine table],
  animalId: Int Primary,
)

Create address (
  addressId: Int Primary AutoIncrement,
  country: Char NotNull,
  city: Char NotNull,
  ward: Char,
  describe: Varchar
)

Foreign owner.ownerId >> animal.ownerId,
Foreign case.animalId >> animal.animalId,
Foreign case.statusId -- status.statusId,
Foreign case.addressId << address.addressId,
Foreign animal_vaccine.vaccineId << vaccine.vaccineId,
Foreign animal_vaccine.animalId << animal.animalId,
`;
