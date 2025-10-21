import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Content() {
    const [products, setProducts] = useState([])
    const [modalWindow, setModalWindow] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(()=>{
        axios.get('data.json')
        .then((response)=> setProducts(response.data))
        .catch((error)=> console.error('Error fetching data:', error))  
    },[])


    function addTocard(product) {
        const checkProduct = selectedProduct.find(item=> product.name === item.name)
        if (checkProduct) {
        if(product.espCount < product.count) {
            product.espCount = checkProduct.espCount + 1
        }
        return ''
        }
        setSelectedProduct([...selectedProduct, product])
    }
    useEffect(()=>{
        const total = selectedProduct.reduce((acc, item) => acc + (item.price * item.espCount), 0)
        setTotalPrice(total)
    }, [[selectedProduct, selectedProduct.espCount]])


    function deleteProduct(product) {
      if(product.espCount > 1){
          product.espCount -= 1
          setSelectedProduct([...selectedProduct])
        return
      }
      setSelectedProduct(selectedProduct.filter(item=> item.name !== product.name))
    }
    return(
    <main style={{overflow: modalWindow ? 'hidden' : 'auto'}}>
        { 
          modalWindow && (
            <>
              {
                <article className='modalWindow'>
                  <aside>
                    <div className='price'>
                        <h2 onClick={()=>setModalWindow(!modalWindow)}><i className="fa-solid fa-angle-left"></i>Close the Window</h2>
                        <h2>Total Price: {totalPrice}</h2>
                    </div>
                    <div className='modalContent' style={{overflowY: selectedProduct.length > 4 ? 'scroll' : ''}}>
                      {
                        selectedProduct.length > 0 && (
                          selectedProduct.map((product, i) => (
                            <div key={i} className='modalItem'>
                              <nav>
                                <h3>{product.name}</h3>
                                <p>Price: ${product.price}</p>
                              </nav>
                              <nav>
                                <p>Count: {product.espCount}</p>
                                <button onClick={()=>deleteProduct(product)}>Delete</button>
                              </nav>
                            </div>
                          ))
                        )
                      }
                      
                    </div>
                  </aside>
                </article>
              }
            </>
          )
        }
        <nav className='getPay' onClick={()=>setModalWindow(!modalWindow)}>
          <i className="fa-solid fa-cart-shopping"></i>
        </nav>
        <div className="container">
            {
              products.map((product, i) => (
                  <div key={i}>
                    <img src={product.img} alt={product.name} />
                    <h2>{product.name}</h2>
                    <p>Count: {product.count}</p>
                    <p>Price: ${product.price}</p>
                    <button onClick={()=>addTocard(product)}>Добавить в корзину</button>
                  </div>
              ))
            }
        </div>
      </main>
  )
}