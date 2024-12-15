import { useState} from 'react'
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './Login'
import Orders from './Orders'

// There are 2 inputs. One is an array with numbers. Other is a number, let’s call it SUM. 
// We need to find whether the sum of any two numbers in the array is equal to the SUM.

function App() {
  // const [firstInput, setFirstInput] = useState('')
  // const [secondInput, setSecondInput] = useState('')
  // const [ans, setAns] = useState(null)
  // const [isResultProcessed, setIsResultProcessed] = useState(false)

  // const handleCalculate = () => {
  //   const arrayOfNumbers = firstInput?.split(',')

  //   if (arrayOfNumbers?.length < 2) {
  //     alert(`Please enter >= 2 numbers in the first argument`)
  //   }
  //   const intSecondInput = Number(secondInput)

  //   const hashMap = {}
  //   for (let i = 0; i < arrayOfNumbers?.length; i++) {
  //     hashMap[Number(arrayOfNumbers[i])] = i
  //   }

  //   for (let i = 0; i < arrayOfNumbers.length; i++) {
  //     const intNum = Number(arrayOfNumbers[i])
  //     let diff = intSecondInput - intNum

  //     if (hashMap[diff] && hashMap[diff] !== i) {
  //       setAns({
  //         number1: intNum,
  //         number2: intSecondInput-intNum
  //       })
  //       break;
  //     }
  //   }
  //   setIsResultProcessed(true)
  // }

  // const handleReset = () => {
  //   setAns(null)
  //   setFirstInput('')
  //   setSecondInput('')
  // }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/orders" element={<Orders />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
