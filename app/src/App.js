import { useState, useEffect } from 'react';

const App = () => {

  const [products, setProducts] = useState([]);
  const [discount, setDiscount] = useState('');
  const [render, setRender] = useState(false);
  const [priceFinal, setPriceFinal] = useState(0);

  useEffect(async () => {
    const url = "/products";
    const res = await fetch(url);
    const data = (await res.json())
    setProducts(await data);
  }, [])
  
    

  function calculate(event){
    event.preventDefault();
    const price = event.target.value
    if (discount >= 100 || discount <= 0) {
      alert("Impossível calcular desconto, informe um valor entre 0 e 100");
    } else {
      
        const form = { price, discount };
        fetch('/calculate', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }).then(res => console.log(res))
          
          // .then((data) => {
          //   console.log(data);

          //   setRender(!render);
          //   setPriceFinal(data);
          // });
    }
  }

  return(
    <>
      <h3>Calculadora de descontos</h3>
        <div className="input-field col s6">
          <input value={discount} onChange={(e)=>setDiscount(e.target.value)} id="first_name" type="number" name="discount" class="validate"/>
          <label htmlFor="first_name">Informe o desconto em %</label>
        </div>
        <div>
          <h3>Selecione um produto</h3>
            {products.map(product =>{
              return(
                  <>
                  <button key={product.id} class="collection-item btn-large" value={product.price} onClick={calculate}>
                    {product.name} R${(product.price).toFixed(2)}
                  </button><br/>
                  </>
              )  
            })}
        </div>
        {render && 
          <div>
            <p>O preço com desconto é {priceFinal}</p>
          </div>
        }
    </>
  )
}

export default App;
