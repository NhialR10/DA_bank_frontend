import React from "react";
import DisplayUserAndAccount from "./DisplayUserAndAccount";

const SearchCustomer = ({ setActiveOperation, setAccountToOperateOn }) => {
  return (
    <div>
      <DisplayUserAndAccount
        setAccountToOperateOn={setAccountToOperateOn}
        setActiveOperation={setActiveOperation}
      />
    </div>
  );
};

export default SearchCustomer;
