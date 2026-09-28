import fs from "node:fs";

const manifestPath="android/app/src/main/AndroidManifest.xml";
const valuesDir="android/app/src/main/res/values";
const drawableDir="android/app/src/main/res/drawable";

fs.mkdirSync(valuesDir,{recursive:true});
fs.mkdirSync(drawableDir,{recursive:true});

const icon=`<vector xmlns:android="http://schemas.android.com/apk/res/android"
    android:width="108dp" android:height="108dp"
    android:viewportWidth="108" android:viewportHeight="108">
    <path android:fillColor="#FFD66B" android:pathData="M0,0h108v108h-108z"/>
    <path android:fillColor="#FFF7E6" android:pathData="M8,8h92v92h-92z"/>
    <path android:strokeColor="#7D8790" android:strokeWidth="4" android:strokeLineCap="round" android:fillColor="@android:color/transparent" android:pathData="M18,46 L31,46 L36,84 L78,84"/>
    <path android:strokeColor="#F36D2B" android:strokeWidth="7" android:strokeLineCap="round" android:fillColor="@android:color/transparent" android:pathData="M15,43 L29,43"/>
    <path android:fillColor="#FF8A3D" android:strokeColor="#C64F1B" android:strokeWidth="2" android:pathData="M31,45 L80,45 L74,75 Q73,81 67,81 L43,81 Q37,81 36,75 Z"/>
    <path android:fillColor="#FFF1BE" android:strokeColor="#D85B20" android:strokeWidth="2" android:pathData="M29,45 C29,39 82,39 82,45 C82,51 29,51 29,45 Z"/>
    <path android:fillColor="#FFC84F" android:pathData="M34,45 C34,42 77,42 77,45 C77,48 34,48 34,45 Z"/>
    <path android:fillColor="#FFFDF7" android:strokeColor="#D8B18A" android:strokeWidth="2" android:pathData="M34,37 C34,28 42,23 49,26 C53,18 66,18 71,25 C79,22 85,28 84,36 C78,39 72,38 68,35 C62,40 54,40 49,35 C44,39 38,39 34,37 Z"/>
    <path android:strokeColor="#9B5B2B" android:strokeWidth="6" android:strokeLineCap="round" android:fillColor="@android:color/transparent" android:pathData="M72,25 C83,32 83,43 76,51"/>
    <path android:strokeColor="#4B2417" android:strokeWidth="2.5" android:strokeLineCap="round" android:fillColor="@android:color/transparent" android:pathData="M46,62 L46,62.2 M66,62 L66,62.2 M49,70 C54,75 61,75 65,70"/>
    <path android:fillColor="#FF8F7C" android:pathData="M38,68 a4,4 0,1 0,8,0 a4,4 0,1 0,-8,0"/>
    <path android:fillColor="#FF8F7C" android:pathData="M67,68 a4,4 0,1 0,8,0 a4,4 0,1 0,-8,0"/>
    <path android:fillColor="#4B352A" android:pathData="M33,84 a7,7 0,1 0,14,0 a7,7 0,1 0,-14,0"/>
    <path android:fillColor="#FFD66B" android:pathData="M37,84 a3,3 0,1 0,6,0 a3,3 0,1 0,-6,0"/>
    <path android:fillColor="#4B352A" android:pathData="M68,84 a7,7 0,1 0,14,0 a7,7 0,1 0,-14,0"/>
    <path android:fillColor="#FFD66B" android:pathData="M72,84 a3,3 0,1 0,6,0 a3,3 0,1 0,-6,0"/>
</vector>`;

fs.writeFileSync(`${drawableDir}/who_is_the_chef_icon.xml`,icon);

fs.writeFileSync(`${valuesDir}/who_is_the_chef_colors.xml`,`<resources>
    <color name="who_is_the_chef_orange">#FF8A3D</color>
    <color name="who_is_the_chef_cream">#FFF6DF</color>
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
