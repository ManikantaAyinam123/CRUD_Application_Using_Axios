
let TotalData=[];
function data(){
axios.get("http://localhost:3000/students")
.then(response => {
var data = response.data;
TotalData=data;
console.log("vbd   "+TotalData);
// console.log(data[0].Name);
let tableData="";
TotalData.map((values)=>{
tableData+=`
<tr>
    
     <th scope="row">${values.id}</th>
     <td>${values.Name}</td>
     <td>${values.Email}</td>
     <td>${values.Designation}</td>
     <td><button class="btn btn-primary" onclick="updateRecord(${values.id})">Edit</button></td>
     <td><button class="btn btn-danger" onclick="deleteRecord(${values.id})">Delete</button></td>

   </tr>`;

});
document.getElementById("table-body").innerHTML=tableData;
//  console.log(data);

})
.catch(error => {
console.error('Error:', error);
});

}
function add() {
      // post 

// var id=$("#empId").val();
var id= parseInt($("#empId").val());
var name=$("#name").val();
var email=$("#email").val();
var designation=$("#designation").val();
console.log(id);

console.log(id);
const postData = {

Name:name,
Email:email,
Designation:designation

};

console.log(postData);

axios.post("http://localhost:3000/students", {

Name:name,
Email:email,
Designation:designation

}).then((response) => {

console.log("response",response);
}).catch(error => {

console.log('Error:', error);
});
data();
}
function deleteRecord(id) {
// alert("The data is deleted...!");
const url="http://localhost:3000/students";
axios.delete(`${url}/${id}`)
 .then(response => {
    
     console.log(response.data);
 })
 .catch(error => {
     console.error('Error:', error);
 });
}

function updateRecord(id){
let mm = TotalData.find(item => item.id === id);
console.log("mm ", mm);
 
 $("#name").val(mm.Name);
 $("#email").val(mm.Email);
 $("#designation").val(mm.Designation);
 $("#ubtn").css("display", "block");
 $("#sebtn").css("display", "none");
 $("#uppH").css("display", "block");
 $("#instH").css("display", "none");
 let btn = $("#ubtn");
 btn.on('click', function(event) 
 {
    
     let name = $("#name").val();
     let email = $("#email").val();
     let Des = $("#designation").val();
     if(name===''||email===''||Des===''){
         alert("Please Dont give empty fields..!");
     }
     else
     {
         let data = {  Name:name,Email:email,Designation:Des};
         console.log("Updating data:", data);
         const url="http://localhost:3000/students";
         axios.put(`${url}/${id}`, data, {
             headers: {
                 'Content-Type': 'application/json'
             }
         })
             .then(response => {
                 const updatedData = response.data;
                 console.log("Updated data:", updatedData);
               
                 $("#name").val('');
                 $("#email").val('');
                 $("#ubtn").hide();
             })
             .catch(error => {
                 alert(error);
             });
         
         
     }
 })
 
}



