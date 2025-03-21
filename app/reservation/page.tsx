
"use client"
import Link from "next/link";
import ExportButton from "../components/ExportExcel";
import { useState, useEffect } from "react";





const page = () => {
    const [allTemp, setTemp] = useState<any>() 
  
    // Fetch products and categories on load
    useEffect(() => {
      fetchProducts(); 
    }, []);
  
    const fetchProducts = async () => {
      const response = await fetch('/api/order');
      if (response.ok) {
        const data = await response.json();
        setTemp(data);
      } else {
        console.error('Failed to fetch products');
      }
    };
    

 

console.log("alld: ",allTemp);







    return (
        <> 
        <ExportButton allTemp={allTemp} />
            <table className="table table-striped container">
                <thead>
                    <tr>
                        <th scope="col">Order #</th>
                        <th scope="col">Total Amount</th> 
                        <th scope="col">Date</th> 
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        allTemp && allTemp?.length > 0 ? (
                            allTemp.map((post: any, index: any) => (
                                <tr>
                                    <td>{post.id}</td>
                                    <td>${post.total}</td> 
                                    <td>{post.date}</td> 
                                    <td><Link className="text-blue-700 mr-3 bg-black p-1"  href={`/order?id=${post.id}`}>View</Link></td>
                                </tr>
                            ))
                        ) : (
                            <div className='home___error-container'>
                                <h2 className='text-black text-xl dont-bold'>...</h2>

                            </div>
                        )
                    }

                </tbody>
            </table>
        </>

    )
}

export default page