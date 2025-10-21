export default function ModalWindow(){
    return(
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
                                <button onClick={()=>setSelectedProduct(selectedProduct.filter(item=> item.name !== product.name))}>Delete</button>
                              </nav>
                            </div>
                          ))
                        )
                      }
                      
                    </div>
                  </aside>
                </article>
    )
}