<template>
  <div class="text-2xl mb-30">
    知识图谱
  </div>
  <div id="viz"></div>
</template>

<script setup lang="ts">
import NeoVis from 'neovis.js';

let neoViz;

function draw() {
    const config = {
        containerId: "viz",
        neo4j: {
            serverUrl: "http://121.43.236.83:7474/browser/",
            serverUser: "neo4j",
            serverPassword: "12345678",
        },
        // labels: {
        //     Character: {
        //         label: "name",
        //         value: "pagerank",
        //         group: "community",
        //         [NeoVis.NEOVIS_ADVANCED_CONFIG]: {
        //             function: {
        //                 title: (node) => viz.nodeToHtml(node, [
        //                     "name",
        //                     "pagerank"
        //                 ])
        //             }
        //         }
        //     }
        // },
        relationships: {
            INTERACTS: {
                value: "weight"
            }
        },
        initialCypher: "MATCH (n)-[r:INTERACTS]->(m) RETURN *"
    };

    neoViz = new NeoVis(config);
    neoViz.render();
}
draw();

</script>