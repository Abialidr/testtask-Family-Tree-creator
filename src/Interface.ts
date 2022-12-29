export class TreeNodeObj {
  name: string;
  id: number;
  male: any;
  female: any;
  children: any;
  constructor(
    value: string,
    id: number,
    male: InterfacefamilyTreeMember,
    female: InterfacefamilyTreeMember
  ) {
    this.name = value;
    this.id = id;
    this.male = male;
    this.female = female;
    this.children = [];
  }
}

export interface InterfacefamilyTreeMember {
  id: number;
  name: string;
  children: number[];
  gender: string;
  parents: number[];
}

export interface InterfaceFamilyHirachy {
  ME: any;
  FEMALE: InterfacefamilyTreeMember;
  MALE: InterfacefamilyTreeMember;
  PARENTS: (string | [])[];
}

export interface InterfaceParents {
  absoluteParents: InterfacefamilyTreeMember[];
  famalyHerachy: any;
  completeFamily: TreeNodeObj[];
}

export interface InterfaceRelationship {
  [key: string]: TreeNodeObj;
}
