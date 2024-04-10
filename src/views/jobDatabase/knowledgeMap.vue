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
  // const config = {
  //     containerId: "viz",
  //     neo4j: {
  //         serverUrl: "neo4j+s://82c8fcea.databases.neo4j.io",
  //         serverUser: "neo4j",
  //         serverPassword: "j8UBJi9twhESJ4KZjHumYRXHcYC1NnfwZZu3ItDzw4Y",
  //     },
  //     // labels: {
  //     //     Character: {
  //     //         label: "name",
  //     //         value: "pagerank",
  //     //         group: "community",
  //     //         [NeoVis.NEOVIS_ADVANCED_CONFIG]: {
  //     //             function: {
  //     //                 title: (node) => viz.nodeToHtml(node, [
  //     //                     "name",
  //     //                     "pagerank"
  //     //                 ])
  //     //             }
  //     //         }
  //     //     }
  //     // },
  //     relationships: {
  //         INTERACTS: {
  //             value: "weight"
  //         }
  //     },
  //     initialCypher: "MATCH (n)-[r:INTERACTS]->(m) RETURN *"
  // };
  // 通过config进行配置
  const config = {
    container_id: "viz",
    serverUrl: "neo4j+s://82c8fcea.databases.neo4j.io",
    serverUser: "neo4j",
    serverPassword: "j8UBJi9twhESJ4KZjHumYRXHcYC1NnfwZZu3ItDzw4Y",
    encrypted: true, // 或者 trust: "TRUST_ALL_CERTIFICATES"
  };


  neoViz = new NeoVis(config);
  neoViz.render();
}
// draw();

</script>