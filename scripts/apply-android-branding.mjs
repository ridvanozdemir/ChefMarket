import fs from "node:fs";

const manifestPath="android/app/src/main/AndroidManifest.xml";
const valuesDir="android/app/src/main/res/values";
const drawableDir="android/app/src/main/res/drawable";

fs.mkdirSync(valuesDir,{recursive:true});
fs.mkdirSync(drawableDir,{recursive:true});

const icon=`<vector xmlns:android="http://schemas.android.com/apk/res/android"
    android:width="108dp" android:height="108dp"
    android:viewportWidth="108" android:viewportHeight="108">
    <path android:fillColor="#FFF8E8" android:pathData="M0,0h108v108h-108z"/>
    <path android:fillColor="#FFFDF7" android:pathData="M5,5h98v98h-98z"/>
    <path android:strokeColor="#AEB5BA" android:strokeWidth="4.5" android:strokeLineCap="round" android:fillColor="@android:color/transparent" android:pathData="M14,46 L31,46 L39,88 L88,88"/>
    <path android:strokeColor="#F06B21" android:strokeWidth="7.5" android:strokeLineCap="round" android:fillColor="@android:color/transparent" android:pathData="M12,43 L30,43"/>
    <path android:fillColor="#FF7A22" android:strokeColor="#B94118" android:strokeWidth="2" android:pathData="M31,48 L89,48 L84,78 Q82,87 73,87 L45,87 Q36,87 34,78 Z"/>
    <path android:fillColor="#FFF3D0" android:strokeColor="#B94118" android:strokeWidth="2" android:pathData="M28,48 C28,39 92,39 92,48 C92,57 28,57 28,48 Z"/>
    <path android:fillColor="#FFC94F" android:pathData="M34,48 C34,43 86,43 86,48 C86,53 34,53 34,48 Z"/>
    <path android:fillColor="#6EAA40" android:pathData="M44,48 a2.5,2.5 0,1 0,5,0 a2.5,2.5 0,1 0,-5,0 M68,48 a2.5,2.5 0,1 0,5,0 a2.5,2.5 0,1 0,-5,0"/>
    <path android:fillColor="#F06D36" android:pathData="M57,45 h5 v4 h-5z M72,50 h5 v4 h-5z"/>
    <path android:strokeColor="#4D2219" android:strokeWidth="2.6" android:strokeLineCap="round" android:fillColor="@android:color/transparent" android:pathData="M43,67 C46,63 50,63 53,67 M67,67 C70,63 74,63 77,67"/>
    <path android:fillColor="#6F211B" android:strokeColor="#4D2219" android:strokeWidth="1.5" android:pathData="M51,72 C55,82 67,82 71,72 C64,75 58,75 51,72 Z"/>
    <path android:strokeColor="#FF8D78" android:strokeWidth="2.2" android:strokeLineCap="round" android:fillColor="@android:color/transparent" android:pathData="M56,79 C60,81 64,81 67,79"/>
    <path android:fillColor="#FF8C75" android:pathData="M37,73 a4,4 0,1 0,8,0 a4,4 0,1 0,-8,0 M76,73 a4,4 0,1 0,8,0 a4,4 0,1 0,-8,0"/>
    <path android:fillColor="#FFFDF8" android:strokeColor="#B78A6F" android:strokeWidth="1.8" android:pathData="M37,43 C34,36 39,29 46,28 C47,20 55,16 63,20 C68,13 78,14 82,21 C90,18 97,24 96,32 C101,34 103,39 102,43 C95,47 87,47 81,43 C75,48 66,48 60,44 C54,48 45,48 39,44 Z"/>
    <path android:fillColor="#FFFAF4" android:strokeColor="#B78A6F" android:strokeWidth="1.8" android:pathData="M42,42 h48 l-4,12 H46z"/>
    <path android:strokeColor="#8A4C20" android:strokeWidth="5.5" android:strokeLineCap="round" android:fillColor="@android:color/transparent" android:pathData="M84,22 C93,27 90,36 87,42 L76,60"/>
    <path android:fillColor="#342A28" android:pathData="M35,89 a8,8 0,1 0,16,0 a8,8 0,1 0,-16,0 M57,93 a8,8 0,1 0,16,0 a8,8 0,1 0,-16,0 M78,88 a7,7 0,1 0,14,0 a7,7 0,1 0,-14,0"/>
    <path android:fillColor="#D9DDE0" android:pathData="M39,89 a4,4 0,1 0,8,0 a4,4 0,1 0,-8,0 M61,93 a4,4 0,1 0,8,0 a4,4 0,1 0,-8,0 M81,88 a3.5,3.5 0,1 0,7,0 a3.5,3.5 0,1 0,-7,0"/>
</vector>`;

fs.writeFileSync(`${drawableDir}/who_is_the_chef_icon.xml`,icon);

fs.writeFileSync(`${valuesDir}/who_is_the_chef_colors.xml`,`<resources>
    <color name="who_is_the_chef_orange">#FF6F20</color>
    <color name="who_is_the_chef_cream">#FFF8E8</color>
</resources>`);

if(fs.existsSync(manifestPath)){
  let manifest=fs.readFileSync(manifestPath,"utf8");
  manifest=manifest
    .replace(/android:icon="[^"]+"/,'android:icon="@drawable/who_is_the_chef_icon"')
    .replace(/android:roundIcon="[^"]+"/,'android:roundIcon="@drawable/who_is_the_chef_icon"');
  fs.writeFileSync(manifestPath,manifest);
}

const stringsPath=`${valuesDir}/strings.xml`;
if(fs.existsSync(stringsPath)){
  let strings=fs.readFileSync(stringsPath,"utf8");
  strings=strings.replace(/<string name="app_name">[\s\S]*?<\/string>/,'<string name="app_name">Who Is the Chef?</string>');
  strings=strings.replace(/<string name="title_activity_main">[\s\S]*?<\/string>/,'<string name="title_activity_main">Who Is the Chef?</string>');
  fs.writeFileSync(stringsPath,strings);
}

console.log("Who Is the Chef? Android branding applied.");