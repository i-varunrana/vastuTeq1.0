export default class modal {

    constructor() {

        this.DIRECTION_EIGHT = [
            {name: 'N', value: 1, color: "blue"}, {name: 'NE', value: 1, color: "blue"}, {name: 'E', value: 1, color: "green"}, {name: 'SE', value: 1, color: "red"}, 
            {name: 'S', value: 1, color: "red"}, {name: 'SW', value: 1, color: "yellow"},  {name: 'W', value: 1, color: "#CCC"}, {name: 'NW', value: 1, color: "#CCC"}
        ];

        this.DIRECTION_SIXTEEN = [
            { name: "N", color: "blue" },{ name: "NNE", color: "blue" },{ name: "NE", color: "blue" },{ name: "ENE", color: "green" },
            { name: "E", color: "green" },{ name: "ESE", color: "green" },{ name: "SE", color: "red" },{ name: "SSE", color: "red" },
            { name: "S", color: "red" },{ name: "SSW", color: "yellow" },{ name: "SW", color: "yellow" },{ name: "WSW", color: "#CCC" },
            { name: "W", color: "#CCC" },{ name: "WNW", color: "#CCC" },{ name: "NW", color: "#CCC" },{ name: "NNW", color: "blue" },
        ];

        this.DIRECTION_THIRTYTWO = [
            {name: 'N4', value: 1, color: "#CCC"}, {name: 'N5', value: 1, color: "#CCC"}, {name: 'N6', value: 1, color: "#CCC"}, 
            {name: 'N7', value: 1, color: "#CCC"}, {name: 'N8', value: 1, color: "green"}, {name: 'E1', value: 1, color: "#CCC"},
            {name: 'E2', value: 1, color: "blue"}, {name: 'E3', value: 1, color: "blue"}, {name: 'E4', value: 1, color: "green"}, 
            {name: 'E5', value: 1, color: "blue"}, {name: 'E6', value: 1, color: "blue"}, {name: 'E7', value: 1, color: "red"},
            {name: 'E8', value: 1, color: "green"}, {name: 'S1', value: 1, color: "yellow"}, {name: 'S2', value: 1, color: "red"}, 
            {name: 'S3', value: 1, color: "red"}, {name: 'S4', value: 1, color: "red"}, {name: 'S5', value: 1, color: "green"}, 
            {name: 'S6', value: 1, color: "yellow"}, {name: 'S7', value: 1, color: "yellow"}, {name: 'S8', value: 1, color: "yellow"}, 
            {name: 'W1', value: 1, color: "#CCC"}, {name: 'W2', value: 1, color: "red"}, {name: 'W3', value: 1, color: "red"},
            {name: 'W4', value: 1, color: "#CCC"}, {name: 'W5', value: 1, color: "#CCC"}, {name: 'W6', value: 1, color: "yellow"}, 
            {name: 'W7', value: 1, color: "#CCC"}, {name: 'W8', value: 1, color: "yellow"}, {name: 'N1', value: 1, color: "yellow"},
            {name: 'N2', value: 1, color: "#CCC"}, {name: 'N3', value: 1, color: "blue"}
        ]; 
    }

    // DRAW MAP
    drawMap({areaArr, division, dimension}) {

        const width = 1080 - 120, height = 500 - 120, margin = 80;

        this.modal = d3.select('#appModal');
        this.modal.select('.modal-body').selectAll('*').remove();
        this.modal.select('.modal-dialog').style('min-width','1150px');
        this.modal.select('.modal-content').style('min-height','460px');
        this.modal.select('.modal-title').text('BAR CHART');
        this.modalBody = this.modal.select('.modal-body').attr('id','printableContent');

        this.printBtnContainer = this.modalBody.append('div').style('position','relative');
        this.printBtn = this.printBtnContainer.append('button').attr('class','btn btn-outline-primary btn-sm text-sm pl-3 pr-3').
        style('position','absolute').style('right','0').text('Print');

        this.printBtn.on('click', () => {
            this.printDiv("printableContent");
        })


        let DATA;

        if(division == 8)
        DATA = this.DIRECTION_EIGHT;
        else if(division == 16)
        DATA = this.DIRECTION_SIXTEEN;
        else
        DATA = this.DIRECTION_THIRTYTWO;

        let scale = Math.pow(parseFloat(dimension.scale/dimension.distance), 2);

        let newAreaArr = areaArr.map(function(d){
            return d * scale;
        })

        let data = newAreaArr.map(function (d, i) {
            return {
              name: DATA[i].name,
              color: DATA[i].color,
              value: d.toFixed(2),
            };
        });

        let sum = newAreaArr.reduce(function(a,b){
            return a + b;
        });

        let LOB = (newAreaArr.length != 0) ? sum / newAreaArr.length : 0;
        
        let maxValue = d3.max(newAreaArr);
        let UB = LOB + ((maxValue - LOB)/2);

        let minValue = d3.min(newAreaArr);
        let LB = LOB - ((LOB - minValue)/2);

        // console.log("LOB UP LB :",LOB,UB,LB);


        const svg = this.modalBody.append('svg');

        const chart = svg.append('g')
        .attr('width', `${width + margin}`)
        .attr('height', `${height + margin}`)
        .style('transform', 'translate(38px,83px)');

        const xScale = d3.scaleBand()
            .range([0, width])
            .domain(data.map((d) => d.name))
            .padding(0.1)

        const yScale = d3.scaleLinear()
            .range([height, 0])
            .domain([0, d3.max(data, (d)=> { return Math.ceil(d.value) })]);

        // vertical grid lines
        // const makeXLines = () => d3.axisBottom()
        //   .scale(xScale)

        const makeYLines = () => d3.axisLeft()
            .scale(yScale)

        chart.append('g')
            .attr('transform', `translate(0, ${height})`)
            .call(d3.axisBottom(xScale));

        chart.append('g')
            .call(d3.axisLeft(yScale));

        const barGroups = chart.selectAll()
            .data(data)
            .enter()
            .append('g')

        barGroups
            .append('rect')
            .attr('class', 'bar')
            .attr('x', (g) => xScale(g.name))
            .attr('y', (g) => yScale(g.value))
            .attr('height', (g) => height - yScale(g.value))
            .attr('width', xScale.bandwidth())
            .attr('fill', (g) => { return g.color })
            .on('mouseenter', function (actual, i) {
                d3.selectAll('.value')
                    .attr('opacity', 0)

                d3.select(this)
                    .transition()
                    .duration(300)
                    .attr('opacity', 0.6)
                    .attr('x', (a) => xScale(a.name) - 5)
                    .attr('width', xScale.bandwidth() + 10)

                const y = yScale(actual.value)

                const line = chart.append('line')
                    .attr('id', 'limit')
                    .attr('x1', 0)
                    .attr('y1', y)
                    .attr('x2', width)
                    .attr('y2', y)

                barGroups.append('text')
                    .attr('class', 'divergence')
                    .attr('y', (a) => xScale(a.name) + xScale.bandwidth() / 2)
                    .attr('x', (a) => - yScale(a.value) + 30)
                    .attr('transform','rotate(-90)')
                    .attr('fill', 'black')
                    .attr('text-anchor', 'middle')
                    .style('font-size','14px')
                    .text((a, idx) => {
                        const divergence = (a.value - actual.value).toFixed(1)

                        let text = ''
                        if (divergence > 0) text += '+'
                        text += `${divergence}`

                        return idx !== i ? text : '';
                    })

            })
            .on('mouseleave', function () {
                d3.selectAll('.value')
                    .attr('opacity', 1)

                d3.select(this)
                    .transition()
                    .duration(300)
                    .attr('opacity', 1)
                    .attr('x', (a) => xScale(a.name))
                    .attr('width', xScale.bandwidth())

                chart.selectAll('#limit').remove()
                chart.selectAll('.divergence').remove()
            })

        barGroups
            .append('text')
            .attr('class', 'value')
            .attr('y', (a) => xScale(a.name) + xScale.bandwidth() / 2)
            .attr('x', (a) => - yScale(a.value) + 30)
            .attr('transform','rotate(-90)')
            .attr('text-anchor', 'middle')
            .style('font-size','12px')
            .text((a) => `${a.value}`)

        const AverageLine = chart.append('g')
            .attr('transform', 'translate(0 ,'+(yScale(LOB))+')')

            AverageLine.append('line')
            .attr('x1', -45)
            .attr('x2', width)
            .attr('stroke','green')
            .attr('stroke-width', 2)
            .attr('stroke-dasharray','8px')

            AverageLine.append('text')
            .text('Line of Balance')
            .attr('x', width + 30)
            .attr('y', -10)
            .attr('text-anchor','middle')
            .style('font-size', '12px')

        const maxLine = chart.append('g')
            .attr('transform', 'translate(0 ,'+(yScale(UB))+')') 

            maxLine.append('line')
            .attr('x1', -65)
            .attr('x2', width)
            .attr('stroke','red')
            .attr('stroke-width', 2)
            .attr('stroke-dasharray','8px')

            maxLine.append('text')
            .text('Upper Balance')
            .attr('x', width + 30)
            .attr('y', -10)
            .attr('text-anchor','middle')
            .style('font-size', '12px')
      
        const minLine = chart.append('g')
            .attr('transform', 'translate(0 ,'+(yScale(LB))+')')

            minLine.append('line')
            .attr('x1', -65)
            .attr('x2', width)
            .attr('stroke','red')
            .attr('stroke-width', 2)
            .attr('stroke-dasharray','8px')

            minLine.append('text')
            .text('Lower Balance')
            .attr('x', width + 30)
            .attr('y', -10)
            .attr('text-anchor','middle')
            .style('font-size', '12px')

    }

    printDiv(divName) {
        let printContents = document.getElementById(divName).innerHTML;
        let originalContents = document.body.innerHTML;

        document.body.innerHTML = printContents;
        window.print();
        // //document.body.innerHTML = originalContents;

        // var DocumentContainer = document.getElementById(divName);
        // var WindowObject = window.open('', "PrintWindow", "width=100vw,height=100vh,top=200,left=200,toolbars=no,scrollbars=no,status=no,resizable=no");
        // WindowObject.document.writeln(DocumentContainer.innerHTML);
        // WindowObject.document.close();
        // WindowObject.focus();
        // WindowObject.print();
        // WindowObject.close();

    }  

    // printDiv(divName) {
    //     var DocumentContainer = document.getElementById(divName);
    //     var WindowObject = window.open('', 'PrintWindow', 'width=1200,height=550,top=50,left=50,toolbars=no,scrollbars=yes,status=no,resizable=yes');
    //     var strHtml = "<html>\n<head>\n <link rel=\"stylesheet\" type=\"text/css\" href=\"test.css\">\n</head><body><div style=\"testStyle\">\n"
    //     + DocumentContainer.innerHTML + "\n</div>\n</body>\n</html>";
    //     WindowObject.document.writeln(strHtml);
    //     WindowObject.document.close();
    //     WindowObject.focus();
    //     WindowObject.print();
    //     WindowObject.close();
        
    //     }

}