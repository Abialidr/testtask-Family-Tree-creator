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
import { array, number, object, string } from 'yup';

const familyValidationSchema = object({
  id: number().required('required'),
  name: string().required('Required'),
  gender: string().required('Required'),
  children: array(number().required('Required')),
  parents: array(number().required('Required')),
});
const familyValidationArrayScheme = array(familyValidationSchema);

const ParentsAndChildrens = () => {
  const [parentsState, setParents] = useState<InterfaceParents>({
    absoluteParents: [],
    famalyHerachy: [],
    completeFamily: [],
  });
  const [family, setFamily] = useState(JSON.stringify(familyTree, null, 4));
  const [loading, setLoading] = useState(false);
  const [Error, setError] = useState('');
  const [reRender, setReRender] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        const parsedFamily = JSON.parse(family);
        await familyValidationArrayScheme.validate(parsedFamily, {
          strict: true,
        });

        const parents: InterfaceParents = {
          absoluteParents: [],
          famalyHerachy: [],
          completeFamily: [],
        };
        const relations: InterfaceRelationship[] = [];
        seperateAbsolute(parsedFamily, parents);
        makeLevels(parsedFamily, parents, findSpouse);
        makeRelations(parsedFamily, parents, relations);
        importRelations(parents, relations);
        setParents(parents);
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        setError(error.message);
        console.log(`🚀 ~ error:`, error.message);
        // alert(error);
      }
    })();
  }, [reRender]);
  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      <div
        style={{
          borderRight: '1px solid black',
        }}
      >
        <h1>Input</h1>
        <div
          style={{
            width: '400px',
            textAlign: 'start',
          }}
        >
          <textarea
            value={family}
            style={{ height: '100%', display: 'block', width: '300px' }}
            onChange={(e) => {
              setFamily(e.target.value);
            }}
            rows={50}
          />
          <br></br>
          <button
            onClick={() => {
              setLoading(true);
              setError('');
              setReRender(!reRender);
            }}
          >
            Re-Render
          </button>
          {/* <pre>{`${family}`}</pre> */}
        </div>
      </div>
      <div style={{ flex: 1, wordWrap: 'break-word' }}>
        {loading ? (
          <h1>'Loading...'</h1>
        ) : Error ? (
          <h1>{Error}</h1>
        ) : (
          <>
            <h1>Output</h1>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {printFamily(parentsState, printChildren)}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default ParentsAndChildrens;
