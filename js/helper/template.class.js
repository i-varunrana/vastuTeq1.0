export default class Template {

    static aayadiDetailedReport(length, breadth, siUnit, aayaDesc, vaaraDesc, amshaDesc, vyayaDesc, 
        yoniDesc, tithiDesc) {

            return `The Aayadi calculation is a matrix of architecture and astrological calculations that 
            are done to check the energy suitability of the plot and its relationship with the owner. 
            It is made up of a set of six criteria: Aaya, Vyaya, Amsha, Nakshatra, Yoni and Vara-tithi, 
            which are applied to dimensions of the building and its astrological associations. Apart 
            from the above Aayadi Shadvarga (Aaya, Vyaya, Amsha, Nakshatra, Yoni and Vaar-tithi) criteria, 
            there are some other criteria like Dravya, Rina, Yoga, Ayu, Vash Mandal and Tarabala which also 
            help in assessing whether the specific qualities of a house are in harmony with the owner.
            <br>
            <br>
            Your property dimensions are:
            <br>
            Length: <span class="length">${length}</span> <span class="si-unit">${siUnit}</span>
            <br>
            Breadth: <span class="breadth">${breadth}</span> <span class="si-unit">${siUnit}</span>
            <br>
            <br>
            We are giving below the Aayadi calculations result for your property.
            <br>
            <br>
            <span class="aaya heading">Aaya</span>
            <br>
            <span class="aaya desc">${aayaDesc}</span>
            <br>
            <br>
            <span class="vaara heading">Vaara</span>
            <br>
            <span class="vaara desc">${vaaraDesc}</span>
            <br>
            <br>
            <span class="amsha heading">Amsha</span>
            <br>
            <span class="amsha desc">${amshaDesc}</span>
            <br>
            <br>
            <span class="dravya heading">Dravya</span>
            <br>
            <span class="dravya-desc"></span>
            <br>
            <br>
            <span class="rina heading">Rina</span>
            <br>
            <span class="rina desc"></span>
            <br>
            <br>
            <span class="Nakshatra heading">Nakshatra</span>
            <br>
            <span class="Nakshatra desc"></span>
            <br>
            <br>
            <span class="tithi heading">Tithi</span>
            <br>
            <span class="tithi desc">${tithiDesc}</span>
            <br>
            <br>
            <span class="yoga heading">Yoga</span>
            <br>
            <span class="aayu desc"></span>
            <br>
            <br>
            <span class="vash-mandal heading">Vash Mandal</span>
            <br>
            <span class="vash-mandal-desc"></span>
            <br>
            <br>
            <span class="vyaya heading">Vyaya</span>
            <br>
            <span class="vyaya desc">${vyayaDesc}</span>
            <br>
            <br>
            <span class="tara-bala heading">Tara Bala</span>
            <br>
            <span class="tara-bala desc"></span>
            <br>
            <br>
            <span class="yoni heading">Yoni</span>
            <br>
            <span class="yoni desc">${yoniDesc}</span>
            <br>
            <br>
            Here is a summary of all the above given factors:`;
    }
}