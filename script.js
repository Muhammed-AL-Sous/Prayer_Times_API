let Selector = document.getElementById("Selector");
let enName = "DI"; // تعيين اسم المدينة الافتراضية (دمشق)

let cities = [
  { "arabic-name": "دمشق", name: "DI" },
  { "arabic-name": "حلب", name: "HL" },
  { "arabic-name": "حمص", name: "HI" },
  { "arabic-name": "الرقة", name: "RA" },
  { "arabic-name": "دير الزور", name: "DY" },
  { "arabic-name": "الحسكة", name: "HA" },
  { "arabic-name": "اللاذقية", name: "LA" },
  { "arabic-name": "طرطوس", name: "TA" },
];

for (let city of cities) {
  let content = `
  <option>${city["arabic-name"]}</option>
  `;
  Selector.innerHTML += content;
}

function getCurrentTimes(name) {
  axios
    .get("http://api.aladhan.com/v1/timingsByCity?country=Syria&city=" + name)
    .then((response) => {
      let dayOfTheWeek = response.data.data.date.hijri.weekday.ar;
      let day = response.data.data.date.gregorian.day;
      let month = response.data.data.date.gregorian.month.number;
      let year = response.data.data.date.gregorian.year;
      document.querySelector(".today").innerHTML =
        dayOfTheWeek + " : " + day + " / " + month + " / " + year;

      // تحديث توقيتات الصلاة
      let timings = response.data.data.timings;
      document.querySelector(".Fajr-time").innerHTML = timings.Fajr;
      document.querySelector(".Sunrise-time").innerHTML = timings.Sunrise;
      document.querySelector(".Dhuhr-time").innerHTML = timings.Dhuhr;
      document.querySelector(".Asr-time").innerHTML = timings.Asr;
      document.querySelector(".Maghrib-time").innerHTML = timings.Maghrib;
      document.querySelector(".Isha-time").innerHTML = timings.Isha;
    });
}

// تغيير المدينة عند تغيير الاختيار
Selector.onchange = function () {
  for (let i = 0; i < cities.length; i++) {
    if (cities[i]["arabic-name"] === this.value) {
      enName = cities[i].name;
      document.querySelector(".main-head > p").innerHTML = this.value;
      getCurrentTimes(enName); // استدعاء الوظيفة مع اسم المدينة الجديد
      break; // الخروج من الحلقة بعد العثور على المدينة
    }
  }
};

// استدعاء الوظيفة لأول مرة
getCurrentTimes(enName);
