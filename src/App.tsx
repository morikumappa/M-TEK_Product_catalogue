import React, { useState } from "react";
import { List, FloatingBubble, Popup, SearchBar } from "antd-mobile";
import { products } from "./products";
import { SearchOutline } from "antd-mobile-icons";
import "./styles.css";

export default function App() {
  const [popupVisible, setPopupVisible] = useState(false);
  const [productsList, setProductsList] = useState(products);
  return (
    <div className="App">
      <List>
        {productsList.map((product) => (
          <List.Item
            key={product.id}
            description={product.description}
            onClick={() => {
              window.location.href = product.link;
            }}
          >
            {product.pn}
          </List.Item>
        ))}
      </List>
      <FloatingBubble
        axis="xy"
        magnetic="x"
        style={{
          "--initial-position-bottom": "24px",
          "--initial-position-right": "24px",
          "--edge-distance": "24px"
        }}
        onClick={() => {
          setPopupVisible(true);
        }}
      >
        <SearchOutline fontSize={25} />
      </FloatingBubble>
      <Popup
        visible={popupVisible}
        onMaskClick={() => {
          setPopupVisible(false);
        }}
        bodyStyle={{
          borderTopLeftRadius: "12px",
          borderTopRightRadius: "12px"
          //minHeight: "40vh"
        }}
      >
        <SearchBar
          placeholder="输入查找元件PN号"
          showCancelButton
          style={{
            padding: "20px"
          }}
          onSearch={(searchContent) => {
            setPopupVisible(false);
            setProductsList(
              products.filter((array) =>
                array.pn.match(searchContent.toUpperCase())
              )
            );
          }}
          onFocus={() => {}}
          onBlur={() => {}}
          onClear={() => {
            setProductsList(products);
          }}
          onCancel={() => {
            setPopupVisible(false);
            setProductsList(products);
          }}
        />
      </Popup>
    </div>
  );
}
