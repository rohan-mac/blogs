   let banner = document.getElementsByClassName("banner")[0]
   let contnent = document.getElementById("maincontent")
   let Cancle = document.getElementById("Cancle")
       // let Submit = document.getElementById("Submit")
   let blogsCreater = document.getElementsByClassName("blog-creat-page")[0]
   let CreateBlog = document.getElementById("Create-Blog")
   let allblogs = document.getElementById("allblogs")
   let loader = document.getElementsByClassName("loader")[0]
   let updateBlog = document.getElementsByClassName("updateBlog")[0]
   let confirmdelete = document.getElementsByClassName("confirm-delete")[0]
   let deleteBlogConfirm = document.getElementById("deleteBlogConfirm")
   let Caconfirmcancle = document.getElementById("Caconfirmcancle")

   Caconfirmcancle.addEventListener("click", (event) => {
       confirmdelete.classList.add("active")
       window.location.reload();
   })


   allblogs.addEventListener("click", (event) => {
       event.preventDefault()
       banner.classList.remove("active")
       contnent.style.display = "block"
       blogsCreater.classList.add("active")
       updateBlog.style.display = "none"
           // createer.style.display = "block"
       window.location.reload();

   })

   let createer = document.getElementById("createer-form")
   let edit;
   let delet;
   // let editid;
   //  edit.id = "editButton"
   // let deleyeid;


   async function displayallblog() {
       try {
           let resolve = await fetch(" https://ewl-server.vercel.app/api/v1/blog/all");


           let array = await resolve.json()
           console.log(array.blogs);
           loader.classList.add("active")




           array.blogs.forEach(blog => {
               let cart = document.createElement("div")
               cart.setAttribute("class", "carts")
               let subheading = document.createElement("h3")
               let title = document.createElement("h4")
               let para = document.createElement("p")


               edit = document.createElement("button")
               delet = document.createElement("button")
               delet.addEventListener("click", () => {
                   deleteBlog(blog._id);
                   console.log(blog._id)
               })


               edit.addEventListener("click", () => {
                   editblogs(blog);
                   console.log(blog._id)

               })


               edit.id = "editButton"
               delet.id = "deleteButton"

               // console.log(edit)


               subheading.innerText = blog.title
               title.innerText = blog.author
               para.innerText = blog.content


               edit.innerText = "Edit"
               delet.innerText = "delete"


               cart.appendChild(subheading)
               cart.appendChild(title)
               cart.appendChild(para)


               cart.appendChild(edit)
               cart.appendChild(delet)


               contnent.appendChild(cart)
           });


       } catch (error) {
           console.log(error);
           let falild = document.createElement("p");
           falild.innerText = "Falid to fetch data";
           document.body.appendChild(falild)
               // console.log(falild);
           loader.classList.add("active")
       } finally {
           loader.classList.add("active");


       }


   }
   // document.getElementById("editButton")
   displayallblog()
       // console.log(edit)




   //    banner.classList.add("active")
   createer.addEventListener("submit", async(event) => {
       event.preventDefault()


       let Author = document.getElementById("Author").value
       let Title = document.getElementById("Title").value
       let Content = document.getElementById("Content").value
           // console.log(Author);
       let data = {
           author: Author,
           content: Content,
           title: Title
       }


       try {
           let Response = await fetch("https://ewl-server.vercel.app/api/v1/blog/create", {
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json'
               },
               body: JSON.stringify(data)


           })


           // displayallblog()
           // banner.classList.remove("active")


       } catch (error) {
           console.log(error);
       } finally {


           blogsCreater.classList.add("active")
           banner.classList.remove("active")
           loader.classList.add("active")
           window.location.reload();

       }


   })
   Cancle.addEventListener("click", (event) => {
       event.preventDefault()
       blogsCreater.classList.add("active")
       banner.classList.remove("active")
       window.location.reload();



       // displayallblog()




   })


   CreateBlog.addEventListener("click", (event) => {
       event.preventDefault()
       loader.classList.remove("active")
           // banner.style.display="none"
       loader.classList.remove("active")

       createer.style.display = "flex"
       blogsCreater.classList.remove("active")

       banner.classList.add("active")
   })
   let btn = document.getElementById("editButton");
   console.log(btn);




   async function deleteBlog(id) {
       confirmdelete.style.display = "flex"
           //    try {
           //        let res = await fetch("https://ewl-server.vercel.app/api/v1/blog/deleteById", {
           //            method: 'POST',
           //            headers: {
           //                'Content-Type': 'application/json'
           //            },
           //            body: JSON.stringify({
           //                id
           //            }),
           //        })
           //        let result = await res.json()
           //        console.log(await result)
           //    } catch (error) {
           //        console.log(error);
           //    } finally {
           //        window.location.reload();

       //    }
       deleteBlogConfirm.addEventListener("click", async() => {
           try {
               let res = await fetch("https://ewl-server.vercel.app/api/v1/blog/deleteById", {
                   method: 'POST',
                   headers: {
                       'Content-Type': 'application/json'
                   },
                   body: JSON.stringify({
                       id
                   }),
               })
               let result = await res.json()
               console.log(await result)
           } catch (error) {
               console.log(error);
           } finally {
               confirmdelete.classList.add("active")
               window.location.reload();

           }


       })

   }
   async function editblogs(blog) {
       // blogsCreater.classList.remove("active")
       contnent.style.display = "none"
       updateBlog.style.display = "block"
           // banner.classList.add("active")
           // createer.style.display = "block"
           // try {
       let idas = blog._id

       let input = document.createElement("input")
       let lable = document.createElement("label")
       let lable1 = document.createElement("label")
       let lable2 = document.createElement("label")
       let input1 = document.createElement("input")
       let input2 = document.createElement("input")
       let cancelButton = document.createElement("button")
       let submitButton = document.createElement("button")

       cancelButton.innerText = "Cancel"
       submitButton.innerText = "Submit"

       lable.innerText = "Auther"
       lable1.innerText = "Title"
       lable2.innerText = "Content"

       cancelButton.addEventListener("click", (event) => {
           window.location.reload();

       });


       input.value = blog.author

       input1.value = blog.content
       input2.value = blog.title

       submitButton.addEventListener("click", async(event) => {
           event.preventDefault()
           updateBlog.style.display = "none"

           let data = {
               author: input.value,
               content: input1.value,
               title: input2.value
           }

           try {
               let res = await fetch(" https://ewl-server.vercel.app/api/v1/blog/updateById", {
                   method: 'POST',
                   headers: {
                       'Content-Type': 'application/json'
                   },
                   body: JSON.stringify({
                       id: idas,
                       ...data
                   }),

               })

               let result = await res.json()
               console.log(result)


           } catch (error) {
               console.log(error.name);


           } finally {
               // contnent.style.display = "block"
               // updateBlog.style.display = "none"
               window.location.reload();

           }
       })


       // input.value = blog.author
       // input1.value = blog.content
       // input2.value = blog.title

       // let result = await res.json()

       updateBlog.appendChild(lable)
       updateBlog.appendChild(input)
       updateBlog.appendChild(lable1)
       updateBlog.appendChild(input2)
       updateBlog.appendChild(lable2)
       updateBlog.appendChild(input1)

       updateBlog.appendChild(submitButton)
       updateBlog.appendChild(cancelButton)
           // console.log(await result)
       console.log(input.value, input2.value, input1.value);

       // } catch (error) {
       //     console.log(error);


       // }


   }