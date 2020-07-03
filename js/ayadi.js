        let AAYA = [
           {remainder: 0, result: `CONSIDERED GOOD FOR RELIGIOUS MERITS`},
           {remainder: 1, result: `BECOMES POOR`},
           {remainder: 2, result: `ILL HEALTH TO WIFE`},
           {remainder: 3, result: `ATTRACTION OF FORTUNE`},
           {remainder: 4, result: `VICTOTIOUS`},
           {remainder: 5, result: `SUDDEN PLEASUNT SURPRISES`},
           {remainder: 6, result: `RIGHTEOUS DESIRES BECOMES FRUITFUL`},
           {remainder: 7, result: `BECOMES SPRITUALLY INCLINED`},
           {remainder: 8, result: `ENJOYES THE GOOD THING IN LIFE`},
           {remainder: 9, result: `ACQUIRES MUCH WEALTH`},
           {remainder: 10, result: `ABUNDANCE OF GOOD`},
           {remainder: 11, result: `NAME AND FAME`}
        ];

        let VYAYA = [
            {remainder: 0, result: `CONDUCTIVE TO HAPPINESS`},
            {remainder: 1, result: `ACHIEVES SUCCESS`},
            {remainder: 2, result: `WILL BE VICTORIOUS`},
            {remainder: 3, result: `MODERATE`},
            {remainder: 4, result: `ENJOYS THE GOOD THINGS OF LIFE`},
            {remainder: 5, result: `VICTORIOUS OVER ENEMIES`},
            {remainder: 6, result: `PROBLEMS OF THE EYE`},
            {remainder: 7, result: `ACQUIRE WEALTH`},
            {remainder: 8, result: `IS HAPPY AND CONTENEDED ALWAYS`},
            {remainder: 9, result: `HAS GOOD FRIENDS`}
        ];

        let AMSHA = [
            {remainder: 1, amsha: "TASKARA", result: `THIEF`},
            {remainder: 2, amsha: "BHUKTI", result: `ENJOYMENT`},
            {remainder: 3, amsha: "SAKTI", result: `POWER`},
            {remainder: 4, amsha: "DHANYAN", result: `BLESSED`},
            {remainder: 5, amsha: "NRUPAN", result: `KING`},
            {remainder: 6, amsha: "KLEEPAN", result: `ALI (NEUTER)`},
            {remainder: 7, amsha: "NIRBHEETI", result: `FEARLESSNESS`},
            {remainder: 8, amsha: "DARIDAN", result: `POOR`},
            {remainder: 9, amsha: "PRESHIYAN", result: `SERVANT`},
        ]

        let YONI = [
            {remainder: 1, yoni: "DHWAJA", face: "EAST", result: `FAME,  BEST FOR CLOTH SHOP AUR DHARMSHALA`},
            {remainder: 2, yoni: "DHUMA", face: "SOUTH EAST", result: `GOOD FOR RESTAURANT OR BUSINESS DEPENDENT ON KITCHEN, BAKERY`},
            {remainder: 3, yoni: "SIMHA", face: "SOUTH", result: `GOOD FOR WEAPONRY, AUTOMOBILES, DRAMA HALL TEMPLES`},
            {remainder: 4, yoni: "SHWANA", face: "SOUTH WEST", result: `GOOD FOR MUSLIMS (YAVAN), TROUBLES FROM ENEMIES`},
            {remainder: 5, yoni: "VRISHABHA", face: "WEST", result: `PALACE, DEVALYA, COLLEGE, DRAMA HALL`},
            {remainder: 6, yoni: "KHARA", face: "NORTH WEST", result: `GOOD FOR ONLY PROSTITUTION BUSINESS, BAD FOR OTHER WORK`},
            {remainder: 7, yoni: "GAJA", face: "NORTH", result: `GOOD FOR POULTRY FARMS, FOR OTHERS DISEASE GIVING`},
            {remainder: 8, yoni: "KAAK", face: "NORTH EAST", result: `GOOD FOR MEDITATION`},
        ];

        let VARA = [
            {remainder: 1, day: "SUNDAY", result: `NOT FAVOURABLE`},
            {remainder: 2, day: "MONDAY", result: `FAVOURABLE`},
            {remainder: 3, day: "TUESDAY", result: `NOT FAVOURABLE`},
            {remainder: 4, day: "WEDNESDAY", result: `FAVOURABLE`},
            {remainder: 5, day: "THURSDAY", result: `FAVOURABLE`},
            {remainder: 6, day: "FRIDAY", result: `FAVOURABLE`},
            {remainder: 7, day: "SATURDAY", result: `NOT FAVOURABLE`},
        ];

        let TITHI = [
            {remainder: 0, tithi: "POORNIMA", result: `NOT FAVOURABLE * MANSARA DOES NOT CONSIDER POORANMASI AS UNFAVOURABLE`},
            {remainder: 1, tithi: "PRATHMA", result: `NOT FAVOURABLE`},
            {remainder: 2, tithi: "DVITYA", result: `FAVOURABLE`},
            {remainder: 3, tithi: "TRITYA", result: `FAVOURABLE`},
            {remainder: 4, tithi: "CHATURTHI", result: `NOT FAVOURABLE`},
            {remainder: 5, tithi: "PANCHAMI", result: `FAVOURABLE`},
            {remainder: 6, tithi: "SASHTI", result: `MODERATE`},
            {remainder: 7, tithi: "SAPTAMI", result: `FAVOURABLE`},
            {remainder: 8, tithi: "ASHTMI", result: `NOT FAVOURABLE`},
            {remainder: 9, tithi: "NAVAMI", result: `NOT FAVOURABLE`},
            {remainder: 10, tithi: "DASHMI", result: `FAVOURABLE`},
            {remainder: 11, tithi: "EKADASHI", result: `NOT FAVOURABLE`},
            {remainder: 12, tithi: "DVADASHI", result: `FAVOURABLE`},
            {remainder: 13, tithi: "TRAYODASHI", result: `FAVOURABLE`},
            {remainder: 14, tithi: "CHATURDASHI", result: `NOT FAVOURABLE`},
            {remainder: 15, tithi: "AMAVASYA", result: `NOT FAVOURABLE * MANSARA DOES NOT CONSIDER AMAVASYA AS UNFAVOURABLE`},
            {remainder: 16, tithi: "PRATHMA", result: `NOT FAVOURABLE`},
            {remainder: 17, tithi: "DVITYA", result: `FAVOURABLE`},
            {remainder: 18, tithi: "TRITYA", result: `FAVOURABLE`},
            {remainder: 19, tithi: "CHATURTHI", result: `NOT FAVOURABLE`},
            {remainder: 20, tithi: "PANCHAMI", result: `FAVOURABLE`},
            {remainder: 21, tithi: "SASHTI", result: `MODERATE`},
            {remainder: 22, tithi: "SAPTAMI", result: `FAVOURABLE`},
            {remainder: 23, tithi: "ASHTMI", result: `NOT FAVOURABLE`},
            {remainder: 24, tithi: "NAVAMI", result: `NOT FAVOURABLE`},
            {remainder: 25, tithi: "DASHMI", result: `FAVOURABLE`},
            {remainder: 26, tithi: "EKADASHI", result: `NOT FAVOURABLE`},
            {remainder: 27, tithi: "DVADASHI", result: `FAVOURABLE`},
            {remainder: 28, tithi: "TRAYODASHI", result: `FAVOURABLE`},
            {remainder: 29, tithi: "CHATURDASHI", result: `NOT FAVOURABLE`}

        ];





d3.select("[name='dimension-unit']").on('change', function() {
    let unit = d3.select(this).property('value');
    d3.selectAll('.unit-text').text(unit);
})

let ownerNakshatraSelect = d3.select('[name="owner-nakshatra"]');

let ownerNakshatraData = [
    {text: "Ashwini", value: 1},{text: "Bharini", value: 2},{text: "kritika", value: 3},
    {text: "Rohini", value: 4},{text: "Mrigshira", value: 5},{text: "Ardra", value: 6},
    {text: "Punarvasu", value: 7},{text: "Pushva", value: 8},{text: "Ashlesha", value: 9},
    {text: "Magha", value: 10},{text: "Poorva Falguni", value: 11},{text: "Uttar Falguni", value: 12},
    {text: "Hasta", value: 13},{text: "Chitra", value: 14},{text: "Swati", value: 15},
    {text: "Vishakha", value: 16},{text: "Anuradha", value: 17},{text: "Jyeshtha", value: 18},
    {text: "Mool", value: 19},{text: "Poorvashadha", value: 20},{text: "Uttarashadha", value: 21},
    {text: "Shravan", value: 22},{text: "Dhanishtha", value: 23},{text: "Shatbhisha", value: 24},
    {text: "Poorva Bhadrapad", value: 25},{text: "Uttara Bhaprapad", value: 26},{text: "Revati", value: 0}
];

let options = ownerNakshatraSelect.selectAll("option")
    .data(ownerNakshatraData)
    .enter()
    .append("option")
    .attr("class","text-uppercase text-sm");

    options.text(function(d) {
        return d.text;
      })
      .attr("value", function(d) {
        return d.value;
      });
      
      