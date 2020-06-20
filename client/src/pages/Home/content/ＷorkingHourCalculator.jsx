import React from 'react'
import TextField from '@material-ui/core/TextField';
import { useState } from 'react';

export default function ＷorkingHourCalculator() {

    const [hour, setHour] = useState(0)
    const [min, setMin] = useState(0);

    const handleWorkingHourChange = (e) => {
        const text = e.target.value
        const finalTextArray = []
        let tempText = ""
        for (let i = 0; i < text.length; i++) {
            if (isNumberOrSepeartor(text[i])) {
                tempText += text[i]
            } else {
                if (tempText != "") {
                    finalTextArray.push(tempText)
                    tempText = ""
                }
            }
        }
        if (tempText != "") finalTextArray.push(tempText)

        let hourArr = []
        let minArr = []
        if (finalTextArray.length % 2 === 0) {
            let arrayLength = finalTextArray.length
            let topRow = finalTextArray.splice(0, (arrayLength / 2))
            let bottomRow = finalTextArray.splice(0, (arrayLength / 2))
            for (let i = 0; i < topRow.length; i++) {
                const inTime = topRow[i]
                const inHour = inTime.split(":")[0]
                const inMin = inTime.split(":")[1]
                const outTime = bottomRow[i]
                const outHour = outTime.split(":")[0]
                const outMin = outTime.split(":")[1]


                let finalHour = outHour - inHour
                let finalMin = outMin - inMin
                if (finalMin >= 30) {
                    finalMin = 30
                } else {
                    finalMin = 0
                }
                if (finalMin >= 60) {
                    finalMin -= 60
                    finalHour += 1
                }
                hourArr.push(finalHour)
                minArr.push(finalMin)
            }
            let TotalHour = 0
            let TotalMin = 0
            hourArr.forEach(hour => TotalHour += hour)
            minArr.forEach(hour => TotalMin += hour)
            console.log(TotalHour)
            setHour(TotalHour)
            setMin(TotalMin)
        } else {

        }
    }

    const isNumberOrSepeartor = (text) => {
        const keyword = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ":"]
        for (let i = 0; i < keyword.length; i++) {
            if (keyword[i] === text) return true
        }
        return false
    }
    return (
        <div>
            <h3>請填入複製過來的工時字串</h3>
            <TextField style={{ width: "100%" }} onChange={handleWorkingHourChange}></TextField>
            <h3 style={{ marginTop: "1rem" }}>您的工時：</h3>
            <h3>{hour} 小時 {min} 分鐘</h3>

        </div>
    )
}
