const container=document.querySelector('.container');
const seats=document.querySelectorAll('.row .seat:not(.occupied)');

const count=document.getElementById('count');
const total=document.getElementById('total');

const movieSelect=document.getElementById('movie');

populateUI();

let ticketPrice= +movieSelect.value;  //+ is for converting string to number


function setMovieData(movieIndex,moviePrice){
  localStorage.setItem('selectedMovieIndex',movieIndex);
  localStorage.setItem('selectedMoviePrice',moviePrice);

}

function updateSelectedCount(){
  const selectedSeats=document.querySelectorAll('.row .seat.selected');
  
  const seatsIndex=[...selectedSeats].map(seat=>[...seats].indexOf(seat));
  localStorage.setItem('selectedSeats',JSON.stringify(seatsIndex));


  const selectedSeatsCount=selectedSeats.length;
  count.innerText=selectedSeatsCount;
  total.innerText=ticketPrice*selectedSeatsCount;
}

//Get data from localstorage and populate UI
function populateUI(){
  const selectedSeats=JSON.parse(localStorage.getItem('selectedSeats'));
  console.log(selectedSeats);
  if(selectedSeats!==null && selectedSeats.length>0){

    seats.forEach((seat,index)=>{
      if(selectedSeats.indexOf(index)>-1){
        seat.classList.add('selected');
      }
    });

  }
  const selectedMovieIndex=localStorage.getItem('selectedMovieIndex');

  if(selectedMovieIndex!==null){
    movieSelect.selectedIndex=selectedMovieIndex;
  }


}



//movie select event
movieSelect.addEventListener('change',(e)=>{
  ticketPrice=+e.target.value;
  setMovieData(e.target.selectedIndex,e.target.value);
  updateSelectedCount();

})


//seat click event
container.addEventListener('click',(e)=>{
  // console.log(e.target);
  if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
    // console.log(e.target);
    e.target.classList.toggle('selected');
    updateSelectedCount();

  }
})


//initial count and total set

updateSelectedCount();



