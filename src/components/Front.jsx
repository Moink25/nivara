const FrontImage=require('../img/front.png')
const Front = () => {
  return ( 
    <section class="text-gray-600 body-font">
      <div class="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
        <img class="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded" alt="hero" src={FrontImage}/>
        <div class="text-center lg:w-2/3 w-full">
          <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">"Sustain the future, track your green journey!</h1>
          <p class="mb-8 leading-relaxed"> Your hub for eco-action! Track progress, join events, and be part of a community committed to greener living. Let's make sustainability our legacy!</p>
          <div class="flex justify-center">
            <a href="/admin-login" class="inline-flex text-white bg-[#802bb1] border-0 py-2 px-6 focus:outline-none hover:bg-[#800b75] hover:scale-105  duration-150 rounded text-lg">Admin</a> 
            <a href="/client-login" class="ml-4 inline-flex bg-[#802bb1] border-0 text-white py-2 px-6 focus:outline-none hover:bg-[#800b75] hover:scale-105 duration-150 rounded text-lg">Client</a>
          </div>
        </div>
      </div>
    </section>
   );
}
 
export default Front;