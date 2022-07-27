import React from 'react';
import ReactFlow from 'react-flow-renderer';
import ReactFileReader from 'react-file-reader';
import {WfToReactFlow} from '../utils/WfToReactFlow'


import {
  removeElements,
  addEdge,
  MiniMap,
  Controls,
  Background,
} from 'react-flow-renderer';

class WfDraw extends React.Component {
    state={
      flowData: null
    };
  
    render(){
      return <div>
        <ReactFileReader 
          multipleFiles={false}
          fileTypes={[".data"]} 
        handleFiles={this.handleFiles}>
          <button className='btn'>Upload</button>
        </ReactFileReader>
        <div style={{ height: 800 }}>
           

            <ReactFlow
                elements={this.state.flowData || []}                
                snapToGrid={true}
                snapGrid={[15, 15]}
              >
                <MiniMap
                  nodeStrokeColor={(n) => {
                    if (n.style?.background) return n.style.background;
                    if (n.type === 'input') return '#0041d0';
                    if (n.type === 'output') return '#ff0072';
                    if (n.type === 'default') return '#1a192b';

                    return '#eee';
                  }}
                  nodeColor={(n) => {
                    if (n.style?.background) return n.style.background;

                    return '#fff';
                  }}
                  nodeBorderRadius={2}
                />
                <Controls />
                <Background color="#aaa" gap={16} />
              </ReactFlow>



        </div>
      </div>;
    } 
    handleFiles = files => {
      let reader = new FileReader();
      try{
        
        const elements = [
          {
            id: '1',
            type: 'input', // input node
            data: { label: 'Input Node' },
            position: { x: 250, y: 25 },
          },
          // default node
          {
            id: '2',
            // you can also pass a React component as a label
            data: { label: <div>Default Node</div> },
            position: { x: 100, y: 125 },
          },
          {
            id: '3',
            type: 'output', // output node
            data: { label: 'Output Node' },
            position: { x: 250, y: 250 },
          },
          // animated edge
          { id: 'e1-2', source: '1', target: '2', animated: true },
          { id: 'e2-3', source: '2', target: '3' },
        ];

        reader.onload =  (e) => {
            // Use reader.result
            let asd = WfToReactFlow(reader.result);
            console.info("-----------> "+asd);
            const test = JSON.parse(reader.result);
            /*
            debugger;
            var nodi = [];
            for(var i = 0; i < 3; i++) {
              var obj = test.elements[i];
          
              nodi.push(obj);
          }
          var edge = [];
          for(var i = 3; i < 5; i++) {
            var obj = test.elements[i];
        
            edge.push(obj);
        }
        const tt = nodi.concat(edge);
        */
            this.setState({
                //flowData: tt
                flowData: asd
            });
            //console.info(JSON.parse(this.state.flowData));
          }
          reader.readAsText(files[0]);
          //reader.readAsDataURL(files[0]);
      }catch(Errore){
        console.info(Errore);
      }
      
    }
  
  }

  export default WfDraw;