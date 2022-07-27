


export  function WfToReactFlow (jsonRead) {
    //console.info(jsonRead);
    let jsonFile = JSON.parse(jsonRead);
    let states = jsonFile.configuration.states;

    var nodes = [];
    const xPosMap = new Map();
    const idMap = new Map();
    for (const st in states) {
        console.log(`${st}: ${states[st]}`);
        var objectRead = states[st];
        let y_position = eval(100*st);
        const idNode = Number(st)+1;

        xPosMap.set(objectRead.id,100);
        idMap.set(objectRead.id,idNode);
        let xpos = 300;
        if(objectRead.id=='CPI_VERIFY_KO'){
            xpos = 200;
        }else if(objectRead.id.trim()=='CPI_VERIFIED' || objectRead.id.trim()=='CPI_SIGNED' || objectRead.id=='COMPLETED'){
            xpos = 400;
        }
        if(objectRead.id=='START'){
            var nn = {
                id: idNode,
                type: 'input',
                data: { label: objectRead.id},            
                position: { x: xpos, y: y_position }
            }
            nodes.push(nn);
        }else{
            var nn = {
                id: idNode,
                data: { label: objectRead.id},            
                position: { x: xpos, y: y_position }
            }
            nodes.push(nn);
        }
        
      }
      
      let edges = [];
      let transitions = jsonFile.configuration.transitions;
      for (const tr in transitions) {
          const idEdge = Number(tr)+1;
          let trasactionRead = transitions[tr];
          let newTr = {
            id:idEdge,
            source: idMap.get(trasactionRead.source) ,
            target: idMap.get(trasactionRead.target) 
          }
        edges.push(newTr);
      }
      let mergeArray = nodes.concat(edges);
    return mergeArray;
} ;

