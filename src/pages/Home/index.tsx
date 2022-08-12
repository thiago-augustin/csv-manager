// import React, { CSSProperties, useState } from 'react';

// import { useCSVReader } from 'react-papaparse';

// const styles = {
//   csvReader: {
//     display: 'flex',
//     flexDirection: 'row',
//     marginBottom: 10,
//   } as CSSProperties,
//   browseFile: {
//     width: '20%',
//   } as CSSProperties,
//   acceptedFile: {
//     border: '1px solid #ccc',
//     height: 45,
//     lineHeight: 2.5,
//     paddingLeft: 10,
//     width: '80%',
//   } as CSSProperties,
//   remove: {
//     borderRadius: 0,
//     padding: '0 20px',
//   } as CSSProperties,
//   progressBarBackgroundColor: {
//     backgroundColor: 'red',
//   } as CSSProperties,
// };

// export default function CSVReader() {
//   const [ list, setList ] = useState<string[]>([]);
//   const { CSVReader } = useCSVReader();
//   // ** EXPRESSÃO REGULAR PARA VALIDAR O FORMATO XX/XX/XXXX XX:XX **
//   const dateTimeRegex = /(\d{2})[-.\/](\d{2})[-.\/](\d{4})\s(\d{2})[-.\:](\d{2})/;

//   return (
//     <CSVReader
//       onUploadAccepted={(results: any) => {
//         const ordened: string[] = results.data.sort();
//         let arr: string[] = [];

//         for (let i = 0; i < ordened.length; i++) {
//           // ** SE FOR VÁLIDO, CONTENDO TODOS OS CAMPOS PREENCHIDOS E RESPEITANDO FORMATO DE DATE E HORA **
//           if (ordened[i][0] && (dateTimeRegex.test(ordened[i][1]) === true && ordened[i][1]) && (dateTimeRegex.test(ordened[i][2]) === true && ordened[i][2]) && ordened[i][3]) {
//             let next = i+1;
//             if(next < ordened.length){
//               if (ordened[i][0] === ordened[next][0] && ordened[i][1] === ordened[next][1] && ordened[i][2] === ordened[next][2] && ordened[i][3] === ordened[next][3]) {
//                 // console.log("Registro repetido! Ignorando...");
//               }else{
//                 // console.log(ordened[i]);
//                 arr.push(ordened[i]);
//               }
//             }
//           }
//         }
//         console.log(typeof(list));
//         setList(arr);
//         console.log(list);
//       }}
//     >
//       {({
//         getRootProps,
//         acceptedFile,
//         ProgressBar,
//         getRemoveFileProps,
//       }: any) => (
//         <>
//           <div style={styles.csvReader}>
//             <button type='button' {...getRootProps()} style={styles.browseFile}>
//               Browse file
//             </button>
//             <div style={styles.acceptedFile}>
//               {acceptedFile && acceptedFile.name}
//             </div>
//             <button {...getRemoveFileProps()} style={styles.remove}>
//               Remove
//             </button>
//           </div>
//           <ProgressBar style={styles.progressBarBackgroundColor} />
//         </>
//       )}
//     </CSVReader>
//   );
// }

import React, { useState, CSSProperties } from 'react';

import {
  useCSVReader,
  lightenDarkenColor,
  formatFileSize,
} from 'react-papaparse';

const GREY = '#CCC';
const GREY_LIGHT = 'rgba(255, 255, 255, 0.4)';
const DEFAULT_REMOVE_HOVER_COLOR = '#A01919';
const REMOVE_HOVER_COLOR_LIGHT = lightenDarkenColor(
  DEFAULT_REMOVE_HOVER_COLOR,
  40
);
const GREY_DIM = '#686868';

const styles = {
  zone: {
    alignItems: 'center',
    border: `2px dashed ${GREY}`,
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    padding: 20,
  } as CSSProperties,
  file: {
    background: 'linear-gradient(to bottom, #EEE, #DDD)',
    borderRadius: 20,
    display: 'flex',
    height: 120,
    width: 120,
    position: 'relative',
    zIndex: 10,
    flexDirection: 'column',
    justifyContent: 'center',
  } as CSSProperties,
  info: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 10,
    paddingRight: 10,
  } as CSSProperties,
  size: {
    backgroundColor: GREY_LIGHT,
    borderRadius: 3,
    marginBottom: '0.5em',
    justifyContent: 'center',
    display: 'flex',
  } as CSSProperties,
  name: {
    backgroundColor: GREY_LIGHT,
    borderRadius: 3,
    fontSize: 12,
    marginBottom: '0.5em',
  } as CSSProperties,
  progressBar: {
    bottom: 14,
    position: 'absolute',
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,
  } as CSSProperties,
  zoneHover: {
    // borderColor: GREY_DIM,
  } as CSSProperties,
  default: {
    borderColor: GREY,
  } as CSSProperties,
  remove: {
    height: 23,
    position: 'absolute',
    right: 6,
    top: 6,
    width: 23,
  } as CSSProperties,
};

export default function CSVReader() {
  const [list, setList] = useState<string[]>([]);
  // ** EXPRESSÃO REGULAR PARA VALIDAR O FORMATO XX/XX/XXXX XX:XX **
  const dateTimeRegex = /(\d{2})[-.\/](\d{2})[-.\/](\d{4})\s(\d{2})[-.\:](\d{2})/;
  const { CSVReader } = useCSVReader();
  const [zoneHover, setZoneHover] = useState(false);
  const [removeHoverColor, setRemoveHoverColor] = useState(
    DEFAULT_REMOVE_HOVER_COLOR
  );

  return (
    <CSVReader
      onUploadAccepted={(results: any) => {
        // ** ORDENANDO OS RESULTADOS OBTIDOS COM A IMPORTAÇÃO DO CSV **
        const ordened: string[] = results.data.sort();

        // ** CRIAÇÃO DO ARRAY QUE VAI ARMAZENAR OS DADOS TRATADOS **
        let arr: string[] = [];

        // ** LOOP QUE IRÁ ITERAR SOBRE TODOS OS ELEMENTOS DO ARRAY PARA REALIZAR AS VALIDAÇÕES **
        for (let i = 0; i < ordened.length; i++) {
          // ** SE FOR VÁLIDO, CONTENDO TODOS OS CAMPOS PREENCHIDOS E RESPEITANDO FORMATO DE DATE E HORA **
          if (ordened[i][0] && (dateTimeRegex.test(ordened[i][1]) === true && ordened[i][1]) && (dateTimeRegex.test(ordened[i][2]) === true && ordened[i][2]) && ordened[i][3]) {
            let next = i+1;
            if(next < ordened.length){
              // ** VALIDANDO SE O REGISTRO ATUAL É IGUAL AO PRÓXIMO REGISTRO ** */
              if (ordened[i][0] === ordened[next][0] && ordened[i][1] === ordened[next][1] && ordened[i][2] === ordened[next][2] && ordened[i][3] === ordened[next][3]) {
                // console.log("Registro "+ ordened[i] +" é repetido! Ignorando...");
              }
              else{
                // console.log("Registro "+ ordened[i] +" não é repetido! Armazenando...");
                arr.push(ordened[i]);
              }
            }
          }
        }
        setList(arr);
        // console.log(list);
        setZoneHover(false);
      }}
      onDragOver={(event: DragEvent) => {
        event.preventDefault();
        setZoneHover(true);
      }}
      onDragLeave={(event: DragEvent) => {
        event.preventDefault();
        setZoneHover(false);
      }}
      multiple
    >
      {({
        getRootProps,
        acceptedFile,
        ProgressBar,
        getRemoveFileProps,
        Remove,
      }: any) => (
        
        <>
          <div
            {...getRootProps()}
            style={Object.assign(
              {},
              styles.zone,
              zoneHover && styles.zoneHover
            )}
          >
            {acceptedFile ? (
              <>
                <div style={styles.file}>
                  <div style={styles.info}>
                    <span style={styles.size}>
                      {formatFileSize(acceptedFile.size)}
                    </span>
                    <span style={styles.name}>{acceptedFile.name}</span>
                  </div>
                  <div style={styles.progressBar}>
                    <ProgressBar />
                  </div>
                  <div
                    {...getRemoveFileProps()}
                    style={styles.remove}
                    onMouseOver={(event: Event) => {
                      event.preventDefault();
                      setRemoveHoverColor(REMOVE_HOVER_COLOR_LIGHT);
                    }}
                    onMouseOut={(event: Event) => {
                      event.preventDefault();
                      setRemoveHoverColor(DEFAULT_REMOVE_HOVER_COLOR);
                    }}
                  >
                    <Remove color={removeHoverColor} />
                  </div>
                </div>
              </>
            ) : (
              'Drop CSV file here or click to upload'
            )}
          </div>
        </>
      )}
    </CSVReader>
  );
}