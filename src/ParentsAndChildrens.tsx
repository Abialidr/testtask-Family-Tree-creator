import React, { useState, useEffect } from 'react';
import { familyTree } from './data';
import { InterfaceParents, InterfaceRelationship } from './Interface';
import {
  seperateAbsolute,
  makeLevels,
  makeRelations,
  importRelations,
  findSpouse,
  printChildren,
  printFamily,
} from './mainFunction';
const ParentsAndChildrens = () => {
  const [parentsState, setParents] = useState<InterfaceParents>({
    absoluteParents: [],
    famalyHerachy: [],
    completeFamily: [],
  });
  const [data, setData] = useState(false);
  useEffect(() => {
    const parents: InterfaceParents = {
      absoluteParents: [],
      famalyHerachy: [],
      completeFamily: [],
    };
    const relations: InterfaceRelationship[] = [];
    seperateAbsolute(familyTree, parents);
    makeLevels(familyTree, parents, findSpouse);
    makeRelations(familyTree, parents, relations);
    importRelations(parents, relations);
    setParents(parents);
    setData(true);
  }, []);
  if (data) {
    return <div>{printFamily(parentsState, printChildren)}</div>;
  } else {
    return <div>LOADING....</div>;
  }
};
export default ParentsAndChildrens;
