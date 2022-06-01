<template>
  <div id="map-wrapper" class="map-wrapper"></div>
</template>

<script>
import * as d3 from "d3";

export default {
  components: {},
  props: {},
  data() {
    return {
      statusList: {
        percent90: {
          name: "매우 많음",
          no: 1,
          color: "#004EA2",
        },
        percent70: {
          name: "많음",
          no: 2,
          color: "#EF426F",
        },
        percent50: {
          name: "보통",
          no: 3,
          color: "#0BA95F",
        },
        percent30: {
          name: "적음",
          no: 4,
          color: "#EF426F",
        },
        percent10: {
          name: "매우 적음",
          no: 5,
          color: "#0088D2",
        },
      },
      province: undefined,
      currentProvince: undefined,
      //   mapArea: MAP_AREA,

      localSeatInfo: null,
    };
  },
  computed: {},
  created() {},
  mounted() {
    this.drawMap();
  },
  methods: {
    partyColor(code) {
      let color = null;
      const localSeatCode = "" + code;
      if (localSeatCode in this.localSeatFinal) {
        const localSeat = this.localSeatFinal[localSeatCode];
        let candidate = null;
        localSeat.some((item) => {
          if (item.elected === true) {
            candidate = item;
            return true;
          }
        });
        if (candidate) {
          const party = candidate.party;
          color = this.partyList[party].color;
        }
      }
      return color;
    },
    drawMap() {
      const geojson = require("@/assets/map/seoul.json");
      // 현재의 브라우저의 크기 계산
      const divWidth = document.getElementById("map-wrapper").clientWidth;
      const width = divWidth < 1000 ? divWidth * 0.9 : 1000;
      const height = width * 1;

      // 지도를 그리기 위한 svg 생성
      const svg = d3
        // .select(".d3")
        .select(".map-wrapper")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

      // 배경 그리기
      //   const background = svg
      //     .append("rect")
      //     .attr("class", "background")
      //     .attr("width", width)
      //     .attr("height", height);

      // 지도가 그려지는 그래픽 노드(g) 생성
      const g = svg.append("g");
      // const effectLayer = g.append('g').classed('effect-layer', true);
      // 지도가 그려지는 그래픽 노드
      const mapLayer = g.append("g").classed("map-layer", true);

      //   // 지도의 출력 방법을 선택(메로카토르)
      let projection = d3.geoMercator().scale(1).translate([0, 0]);

      //   // svg 그림의 크기에 따라 출력될 지도의 크기를 다시 계산
      const path = d3.geoPath().projection(projection);
      const bounds = path.bounds(geojson);
      const widthScale = (bounds[1][0] - bounds[0][0]) / width;
      const heightScale = (bounds[1][1] - bounds[0][1]) / height;
      const scale = 0.95 / Math.max(widthScale, heightScale);
      const xoffset =
        width / 2 - (scale * (bounds[1][0] + bounds[0][0])) / 2 + 0;
      const yoffset =
        height / 2 - (scale * (bounds[1][1] + bounds[0][1])) / 2 + 0;
      const offset = [xoffset, yoffset];
      projection.scale(scale).translate(offset);

      const color = d3
        .scaleLinear()
        .domain([1, 20])
        .clamp(true)
        .range(["#595959", "#595959"]);

      // Get province name length
      function nameLength(d) {
        const n = nameFn(d);
        return n ? n.length : 0;
      }

      // Get province name
      function nameFn(d) {
        return d && d.properties ? d.properties.name : null;
      }

      // Get province color
      const _this = this;

      function fillFn(d) {
        const pcolor = _this.partyColor(d.properties.SGG_Code);
        if (pcolor) {
          return pcolor;
        }

        return color(nameLength(d));
      }
      // 지도 그리기
      mapLayer
        .selectAll("path")
        .data(geojson.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("vector-effect", "non-scaling-stroke")
        .style("fill", fillFn);
    },
  },
};
</script>

<style lang="scss">
.map-wrapper {
  text-align: center;
  width: 400px;
  height: 400px;

  .background {
    /* fill: #021019; */
    fill: transparent;
    pointer-events: all;
  }

  .map-layer {
    fill: #08304b;
    stroke: #021019;
    stroke-width: 1px;
  }
}
</style>
