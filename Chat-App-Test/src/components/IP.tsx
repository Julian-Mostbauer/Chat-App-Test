import React, { useState, useEffect } from 'react';


export default function GetIP(getFunction) {

 useEffect(() => {
   fetch('https://api.ipify.org?format=json')
     .then(response => response.json())
     .then(data => getFunction(data.ip));
 }, [getFunction]);

}
