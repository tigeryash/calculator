
import { useState } from 'react'
import './App.css'

function App() {
  const [theme1, setTheme1] = useState(false)
  const [theme2, setTheme2] = useState(false)
  const [theme3, setTheme3] = useState(true)
  const [previousOperand, setPreviousOperand] = useState('')
  const [currentOperand, setCurrentOperand] = useState('')
  const [operation, setOperation] = useState()
  const buttons = [{face:'7', type:'num'}, {face: '8', type:'num'}, {face: '9', type:'num'}, {face:'DEL', type:'action'},
   {face:'4', type:'num'}, {face:'5', type:'num'}, {face:'6', type:'num'}, {face:'+', type:'action'}, 
   {face:'1', type:'num'}, {face:'2', type:'num'}, {face:'3', type:'num'}, {face:'-', type:'action'}, {face:'.', type:'num'},
    {face:'0', type:'num'}, {face:'/', type:'action'}, {face:'x', type:'action'}, {face:'RESET', type:'action'}, {face:'=', type:'action'}]

  function handleClick(e) {
    
    if(e.target.id === "one"){
      setTheme1(true)
      setTheme2(false)
      setTheme3(false) 
    }

    if(e.target.id === "two"){
      setTheme1(false)
      setTheme2(true)
      setTheme3(false)
    }

    if(e.target.id === "three"){
      setTheme1(false)
      setTheme2(false)
      setTheme3(true)
    }
  }

  function Compute(){
    let computation
    const prev = parseFloat(previousOperand)
    const curr = parseFloat(currentOperand)
    if (isNaN(previousOperand) || isNaN(currentOperand)) return
    switch (operation) {
      case '+':
        computation = prev + curr
        break
      case '-':
        computation = prev - curr
        break
      case 'x':
        computation = prev * curr
        break
      case '/':
        computation = prev / curr
        break
      default:
        return
    }
    setCurrentOperand(computation)
    setOperation(undefined)
    setPreviousOperand('')
  }

  function Action(e){
    console.log(e.target.value)
    if (currentOperand === '') return
    if (previousOperand !== '') {
      Compute()
    }
    setOperation(e.target.value)
    setPreviousOperand(currentOperand)
    setCurrentOperand('')
  }

  function Delete(){
    setCurrentOperand(prevOp => prevOp.toString().slice(0, -1))
  }

  function Reset(){
    setCurrentOperand('')
    setPreviousOperand('')
    setOperation(undefined)
  }

  function Num(e){
    if (e.target.value === '.' && currentOperand.includes('.')) return
    setCurrentOperand(prevOp => prevOp.toString() + e.target.value.toString())

  }



  return (
    <main className={`${theme1 ? "theme-1" : theme2 ? "theme-2" : "theme-3"}`}>
      <div className='app'>

      
      <header className={`title ${theme1 ? "title-theme-1" : theme2 ? "title-theme-2" : "title-theme-3"}`}>
        <h1 >calc</h1>

        <div className='theme-switch-container'>
          <p className='theme'>
            THEME
          </p>

          <div className={`tri-toggle ${theme1 ? "toggle-bg-1" : theme2 ? "toggle-bg-2" : "toggle-bg-3"}`}>
            
            <div className='input-holder-1'>
              <label htmlFor='one'>1</label>
              <input 
                className='button' 
                style={theme1 ? {opacity: 1} : {opacity: 0}} 
                onClick={(e) => handleClick(e)} 
                type='radio' name='toggle' id='one'/>
            </div>

            <div className='input-holder-2'>
              <label htmlFor='two'>2</label>
              <input 
              className='button'style={theme2 ? {opacity: 1} : {opacity: 0}} 
              onClick={(e) => handleClick(e)} 
              type='radio' name='toggle' id='two'/>
            </div>

            <div className='input-holder-3'>
              <label htmlFor='3'>3</label>
              <input 
                className='button' style={theme3 ? {opacity: 1} : {opacity: 0}} 
                onClick={(e) => handleClick(e)} 
                type='radio' name='toggle' id='three'/>
            </div>
          </div>
        </div>
      </header>

      <input 
        className={`screen ${theme1 ? "screen-bg-1" : theme2 ? "screen-bg-2" : "screen-bg-3"}`} 
       name='screen' value={currentOperand} onChange={e => setCurrentOperand(e.target.value)}
      />

      <section className={`keypad ${theme1 ? "keypad-bg-1" : theme2 ? "keypad-bg-2" : "keypad-bg-3"}`}>
        {buttons.map((button, idx) => {
          if(button.face === "DEL"){
            return <button 
              onClick={Delete}
              key={idx} className={`buttons ${theme1 ? "del-1" : theme2 ? "del-2" : "del-3"}`}>
              {button.face}
            </button>
          
          }
          else if(button.face === "RESET"){
            return <button onClick={Reset} key={idx} className={`bot-btn ${theme1 ? "res-1" : theme2 ? "res-2" : "res-3"}`}>
              {button.face}
            </button>
          }
          else if(button.face === "="){
            return <button onClick={Compute} key={idx} className={`bot-btn ${theme1 ? "eq-1" : theme2 ? "eq-2" : "eq-3"}`}>
              {button.face}
            </button>
        }else{
          return <button onClick={(e) =>button.type === "action" ? Action(e) : Num(e) } value={button.face} key={idx} className={`buttons ${theme1 ? "btn-1" : theme2 ? "btn-2" : "btn-3"}`}>
              {button.face}
            </button>
        }
        
        })  }
        
        

      </section>
      </div>
    </main>
  )
}

export default App
