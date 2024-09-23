export class EntityGenerator {
  generateEntity(json: any[]): string {
    let output = "";

    json.forEach((entity) => {
      const { name, property } = entity;
      const className = this.capitalizeFirstLetter(name);
      const entityProperties = this.generateProperties(property);

      output += `
@Entity('${name}')
export class ${className} {
${entityProperties}
}\n`;
    });

    return output;
  }

  generateProperties(properties: any[]): string {
    let propertiesOutput = "";
    properties.forEach((prop) => {
      const { name, dataType, constrains } = prop;
      const columnType = this.mapDataType(dataType);
      const options = this.parseConstraints(constrains);

      propertiesOutput += `  @Column(${options})\n  ${name}: ${columnType};\n`;
    });
    return propertiesOutput;
  }

  mapDataType(dataType: string): string {
    const typeMap: { [key: string]: string } = {
      Int: "number",
      Varchar: "string",
      Char: "string",
    };
    return typeMap[dataType] || "string";
  }

  parseConstraints(constrains: string): string {
    let options = "{ ";
    if (constrains.includes("Primary")) {
      options += "primary: true, ";
    }
    if (constrains.includes("AutoIncrement")) {
      options += 'type: "increment", ';
    }
    if (constrains.includes("Unique")) {
      options += "unique: true, ";
    }
    if (constrains.includes("NotNull")) {
      options += "nullable: false, ";
    } else {
      options += "nullable: true, ";
    }
    options = options.trim().replace(/,\s*$/, "") + " }"; 
    return options;
  }

  capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
