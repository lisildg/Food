import React, { useState } from "react";
import axios from "axios";
import style from '../Form/form.module.css'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { traerDietas } from "../../Redux/actions";
import validations from "./validations";
import { useHistory } from "react-router-dom";
import { Nav2 } from "../../components/Nav copy/NavBar2";

import Loader from "../../components/Loading/Loader";


export function Form() {
 
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() =>{
      dispatch(traerDietas())
  }, [])

  const diets = useSelector(state => state.dietas)


  const [form, setForm] = useState({
      name: '',
      summary: '',
      healthScore: 0,
      steps: '',
      image: '',
      diets: []
  });

  

  const [error, setError] = useState('');

  const handleName = (event) => {
      setForm({
          ...form,
          name: (event.target.value)
      })
      validations({
          ...form,
          name: (event.target.value)
      })
  };

  const handleSummary = (event) => {
      setForm({
          ...form,
          summary: (event.target.value)
      })
      validations({
          ...form,
          summary: (event.target.value)
      })
  };

  const handleHealthScore = (event) => {
      setForm({
          ...form,
          healthScore: (event.target.value)
      })
      validations({
          ...form,
          healthScore: (event.target.value)
      })
  };

  const handleSteps = (event) =>{
      setForm({
          ...form,
          steps: (event.target.value)
      })
      validations({
          ...form,
          steps: (event.target.value)
      })
  };

  const handleImage = (event) => {
      setForm({
          ...form,
          image: (event.target.value)
      })
      validations({
          ...form,
          image: (event.target.value)
      })
  };

 

  const handleDiets = (event) => {
      if(event.target.checked){
          setForm({
              ...form,
              diets: [...form.diets, event.target.value]
          })
  
          setError(validations({
              ...form,
              diets: [...form.diets, event.target.value]
          },
          ))
      } else {
          setForm({
              ...form,
              diets: form.diets.filter(t => t !== event.target.value)
          })
  
          setError(validations({
              ...form,
              diets: form.diets.filter(t => t !== event.target.value)
          }))
      }
  }

  const handleSubmit = async (event) => {
      event.preventDefault();
      
    try {
        await axios.post('/recipes', form)
        .then((a) =>
        setForm({
            name: '',
            summary: '',
            healthScore: 0,
            steps: '',
            image: '',
            diets: []
        }))
        alert('Recipe created')
        history.push('/home')
    } catch (error) {
        console.log(error)
    }
  }
 ;
  
  useEffect(() => {
      setError(validations(form))
  }, [form])
  const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      // Simulando una tarea asincrónica
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }, []);
    if (isLoading) {
      return <Loader />;
    }


  return (
    <div className={style.fondo}>
      <div className= {style.card}>
        <Nav2 className={style.nav} />
      <form onSubmit={handleSubmit} className={style.form}>
          <div>
              <label htmlFor="name">Name: </label>
              <input type='text' id='name' value={form.name} onChange={handleName}></input>
              {error.name && <p style={{color: 'red'}} >{error.name}</p>}
          </div>
          <div>
              <label htmlFor="summary">Summary: </label>
              <textarea id="summary" value={form.summary} onChange={handleSummary}></textarea>
              {error.summary && <p style={{color: 'red'}} >{error.summary}</p>}
          </div>
          <div>
              <label htmlFor="healt-Score">HealthScore: </label>
              <input type='number' max='100' min='0' id='health-Score' value={form.healthScore} onChange={handleHealthScore}></input>
              {error.healthScore && <p style={{color: 'red'}} >{error.healthScore}</p>}
          </div>
          <div>
              <label htmlFor="steps">Steps: </label>
              <textarea id="steps" value={form.steps} onChange={handleSteps}></textarea>
              {error.steps && <p style={{color: 'red'}} >{error.steps}</p>}
          </div>
          <div>
              <label htmlFor="image">Image: </label>
              <input type='text' id='image' value={form.image} onChange={handleImage}></input>
              {error.image && <p style={{color: 'red'}} >{error.image}</p>}
          </div>
          <span>Diets: </span>
              <div>
                  {diets?.map((option, index) => (
                      <label key={index}>
                          <input
                              type="checkbox"
                              value={option.name}
                              id={option.id}
                              onChange={handleDiets}/>
                          {option.name}
                         
                      </label>
                  ))}
              </div>
              <div>
                  <button type="submit"disabled={(!form.name  || !form.summary || !form.steps  || !form.healthScore  || !form.diets.length || !form.image )? true : false}>Create Recipe</button>
              </div>
      </form>
      </div>
      </div>
  )

}