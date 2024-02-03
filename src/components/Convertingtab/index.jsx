"use client"
import { useRef } from "react"

const Convertingtab = () => {
    const searchRef = useRef()

    const conversions = {
        Celcius: {
            comparison: 5,
            lowest: 0,
            highest: 100
        },
        Reamur: {
            comparison: 4,
            lowest: 0,
            highest: 80
        },
        Fahrenheit: {
            comparison: 9,
            lowest: 32,
            highest: 212
        },
        Kelvin: {
            comparison: 5,
            lowest: 273,
            highest: 373
        },
    }

    const handleConvert = async (event) => {
        let amount = searchRef.current.value
        amount = parseFloat(amount.replace(',', '.'))
        const fromTemp = document.getElementById("fromTemperature").value
        const toTemp = document.getElementById("toTemperature").value
        const stepElem = document.getElementById("convertStep")
        const resElem = document.getElementById('convertResult')
        stepElem.innerHTML = `<p></p>`
        resElem.textContent = ``

        if (event.key === "Enter" || event.type === "click") {
            if (!amount && amount != 0) {
                event.preventDefault()
                stepElem.textContent = "Invalid"
                alert("input valid amount")
                return
            }
            if (fromTemp === "" || toTemp === "") {
                event.preventDefault()
                stepElem.textContent = "Invalid"
                alert("select valid unit")
                return
            }

            event.preventDefault()
            var steps = []
            let convertt = 0
            let converted = 0
            const comparisona = conversions[toTemp].comparison
            const comparisonb = conversions[fromTemp].comparison
            const lowesta = conversions[fromTemp].lowest
            const lowestb = conversions[toTemp].lowest

            if (conversions[fromTemp].hasOwnProperty('comparison') && conversions[toTemp].hasOwnProperty('comparison')) {
                if ((comparisona !== undefined) && (comparisonb !== undefined)) {
                    convertt = comparisona / comparisonb
                    steps.push(`Step 1: Nilai perbandingan dari ${fromTemp} dengan ${toTemp} adalah ${comparisona}/${comparisonb}`)
                } else {
                    steps.push("invalid")
                }
            } else {
                steps.push("invalid")
            }

            if (conversions[fromTemp].hasOwnProperty('lowest') && conversions[toTemp].hasOwnProperty('lowest')) {
                if (lowesta < lowestb) {
                    converted = (convertt * amount) + lowestb
                    steps.push(`Step 2: Hasil dari step 1 (${comparisona}/${comparisonb}) dikalikan dengan input (${amount}) kemudian dijumlahkan dengan titik tetap bawah (${lowestb})`)
                    steps.push(`Step 3: (${comparisona}/${comparisonb} x ${amount}) + ${lowestb}`)
                    resElem.textContent = `Result : ${amount} ${fromTemp} = ${converted} ${toTemp}`
                } else if (lowesta > lowestb) {
                    converted = (convertt * (amount - lowesta)) + lowestb
                    steps.push(`Step 2: input (${amount}) dikurangi dengan titik tetap bawah (${lowesta}) kemudian dikalikan dengan Hasil dari step 1 (${comparisona}/${comparisonb})`)
                    steps.push(`Step 3: ${comparisona}/${comparisonb} x (${amount} - ${lowesta})`)
                    resElem.textContent = `Result : ${amount} ${fromTemp} = ${converted} ${toTemp}`
                } else {
                    converted = convertt * amount
                    steps.push(`Step 2: input (${amount}) dikalikan dengan Hasil dari step 1 (${comparisona}/${comparisonb})`)
                    steps.push(`Step 3: ${comparisona}/${comparisonb} x (${amount} - ${lowesta})`)
                    resElem.textContent = `Result : ${amount} ${fromTemp} = ${converted} ${toTemp}`
                }
            } else {
                steps.push("invalid")
            }

            for (var i = 0; i < steps.length; i++) {
                stepElem.innerHTML += `<p>${steps[i]}</p>`
            }
        }
    }

    return (
        <>
            <div className='py-4 px-8 bg-gray-100 shadow-xl text-start w-full h-auto'>
                <h1>Amount :</h1>
                <form onSubmit={handleConvert}
                    onKeyDown={handleConvert}>
                    <input placeholder='0'
                        className='w-full p-1.5 left-0 right-0 rounded-md h-12 '
                        ref={searchRef}
                        id="amount"
                    />
                </form>
                <div className="grid grid-cols-2 my-3 h-12 text-gray-700 ">
                    <div className="grid grid-rows-1 mx-1">
                        <select id="fromTemperature" className="rounded-md hover:bg-gray-200 duration-200">
                            <option value="">from..</option>
                            <option value="Celcius">C</option>
                            <option value="Reamur">R</option>
                            <option value="Fahrenheit">F</option>
                            <option value="Kelvin">K</option>
                        </select>
                    </div>
                    <div className="grid my grid-rows-1 mx-1 h-12 text-gray-700">
                        <select id="toTemperature" className="rounded-md hover:bg-gray-200 duration-200">
                            <option value="">to..</option>
                            <option value="Celcius">C</option>
                            <option value="Reamur">R</option>
                            <option value="Fahrenheit">F</option>
                            <option value="Kelvin">K</option>
                        </select>
                    </div>
                </div>
                <button
                    className="border mb-2 w-full p-1.5 h-12 left-0 right-0 rounded-xl bg-white hover:bg-orange-300 duration-200"
                    onClick={handleConvert}
                >
                    Convert
                </button>
                <div id="convertStep" className="h-auto text-sm"></div>
                <div id="convertResult" className="h-auto font-bold"></div>
            </div>

        </>
    )
}

export default Convertingtab