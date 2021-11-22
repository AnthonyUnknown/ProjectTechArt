import React from "react";
import { IContext } from "./interfaces";

const ContextProp = React.createContext<IContext>({ user: null, onLog: null });

export default ContextProp;
