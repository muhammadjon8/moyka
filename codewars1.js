/* Musbat butun son berilgan bo'lsa millis, millisekundlarda uxlaydigan asinxron funktsiyani yozing millis . U har qanday qiymatni hal qilishi mumkin.

 

1-misol:

Kirish: millis = 100
 Chiqish: 100
 Izoh: 100ms dan keyin hal bo'ladigan va'dani qaytarishi kerak.
let t = Date.now();
uyqu (100). keyin (() => {
  console.log(Sana.now() - t); // 100
});
2-misol:

Kirish: millis = 200
 Chiqish: 200
 Izoh: 200ms dan keyin hal bo'ladigan va'dani qaytarishi kerak.
  */

/* async function sleep(millis) {
    await new Promise(resolve => setTimeout(resolve, millis));
} */

//***************************************************************************

// Berilgan qiymat berilgan sinf yoki yuqori sinfning namunasi ekanligini tekshiradigan funktsiyani yozing. Ushbu muammo uchun ob'ekt ushbu sinfning usullariga kirish huquqiga ega bo'lsa, ob'ekt berilgan sinfning namunasi hisoblanadi.

// Funktsiyaga uzatilishi mumkin bo'lgan ma'lumotlar turlari bo'yicha hech qanday cheklovlar yo'q. Masalan, qiymat yoki sinf bo'lishi mumkin  undefined.

// let checkIfInstanceOf = function(obj, classFunction) {
//     while(obj!=null)
//     {
//         if(obj.constructor === classFunction)
//         {
//             return true;
//         }
//         obj = Object.getPrototypeOf(obj);
//     }
//     return false;
// };
// checkIfInstanceOf(new Date(), Date); // true
