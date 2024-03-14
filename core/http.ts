export class  Api {
   baseUrl = "https://api.basilica.finance"

   public async get(url:string , headers) {
  return await fetch(`${this.baseUrl}/${url}`, {
        method: "GET",
        headers: {
          ...headers,
          "Content-Type": "application/json",
        },
      });
   } 
   public async post(url:string , body, headers) {
    return await fetch(`${this.baseUrl}/${url}`, {
          method: "POST",
          headers: {
            ...headers,
            "Content-Type": "application/json",
          },
          body
        });
     }
     public async put(url:string , body ,headers) {
      return await fetch(`${this.baseUrl}/${url}`, {
            method: "PUT",
            headers: {
              ...headers,
              "Content-Type": "application/json",
            },
            body
          });
       }
       public async delete(url:string , headers) {
        return await fetch(`${this.baseUrl}/${url}`, {
              method: "DELETE",
              headers: {
                ...headers,
                "Content-Type": "application/json",
              },
            });
         }
         public async patch(url:string , body ,headers) {
          return await fetch(`${this.baseUrl}/${url}`, {
                method: "PATCH",
                headers: {
                  ...headers,
                  "Content-Type": "application/json",
                },
                body
              });
           }
    
}