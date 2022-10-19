<Container fluid={true}>
  <Row>
    {checkOut ? (
      <div>
        <div className="col-4">
          <CheckoutPage
            key="CheckoutPage"
            userOrTable={userOrTable}
            tableName={tableName}
            basketTotal={basketTotal}
            setBasketTotal={setBasketTotal}
          />{' '}
        </div>
        <div className="col-4"></div>
      </div>
    ) : null}
    {products ? (
      <div className="col-8 menu">
        <Container>
          <Row>
            {items.map((item) => {
              return (
                <SingleItemButton
                  tableName={tableName}
                  name={item.name}
                  price={item.price}
                  id={item.id}
                  setNewCounter={setNewCounter}
                  counter={counter}
                  userOrTable={userOrTable}
                />
              );
            })}
          </Row>
        </Container>
      </div>
    ) : null}
    {!products ? (
      <Tables
        key="table"
        setTableName={setTableName}
        setProducts={setProducts}
        setNewCounter={setNewCounter}
        counter={counter}
        setUserOrTable={setUserOrTable}
      />
    ) : null}
    <div className="order-box col-4">
      <Container>
        <Row>
          <MenuBasket
            setNewCounter={setNewCounter}
            key="MenuBasket"
            counter={counter}
            tableName={tableName}
            userOrTable={userOrTable}
            setCheckout={setCheckout}
            basketTotal={basketTotal}
            setBasketTotal={setBasketTotal}
          />
        </Row>
      </Container>
    </div>
  </Row>
</Container>;
