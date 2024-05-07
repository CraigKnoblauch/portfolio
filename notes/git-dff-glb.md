I learned today that you can have custom programs run on specific files when you do a git diff.

When I was researching my material names in glb file issue, I came across this utility: https://github.com/paulmelis/glbdump

I put that in my /usr/bin and assigned it to run on diffs on glb files like so:

1. Add `glbdump` as the diff option for glb files in the .gitattributes file
```
*.glb diff=glbdump
```
2. Run this command:
```sh
git config diff.glbdump.textconv glbdump
```

Here's an example of an output when I had a difference in a glb file:
```diff
-Total file size 3,149,464 bytes
+Total file size 3,148,112 bytes
 
-JSON chunk (129,444 bytes)
+JSON chunk (128,092 bytes)
 
 Asset Version   : 2.0
       Generator : "Khronos glTF Blender I/O v4.0.44"
@@ -11,14 +11,14 @@ Elements:
  126 meshes
 
    1 buffers    (3,019,992 bytes)
- 471 accessors  (3,019,952 bytes)
+ 464 accessors  (3,019,952 bytes)
 
 Meshes:
 [   0]        2,382 bytes   1P [T]    "Plane.088"                     63V      183I       63N       63T0  
 [   1]        1,656 bytes   1P [T]    "PalmTree_1_Cylinder....        48V      252I       48N  
 [   2]        1,656 bytes   1P [T]    "PalmTree_3_Cylinder....        48V      252I       48N  
-[   3]       31,128 bytes   2P [T]    "PalmTree_1_Cylinder....       876V    5,052I      876N  
-[   4]       24,768 bytes   1P [T]    "PalmTree_3_Cylinder....       696V    4,032I      696N  
+[   3]       31,128 bytes   1P [T]    "palm tree canopy.001"         876V    5,052I      876N  
+[   4]       24,768 bytes   1P [T]    "palm tree canopy"             696V    4,032I      696N  
 [   5]        4,200 bytes   1P [T]    "Cube.109"                     120V      180I      120N      120T0  
 [   6]       17,892 bytes   1P [T]    "Cone.001"                     504V      882I      504N      504T0  
 [   7]        2,544 bytes   1P [T]    "Cube.110"                      72V      120I       72N       72T0  
@@ -117,7 +117,7 @@ Meshes:
 [ 100]          878 bytes   1P [T]    "Cube.007"                      25V       39I       25N       25T0  
 [ 101]          878 bytes   1P [T]    "Cube.008"                      25V       39I       25N       25T0  
 [ 102]          878 bytes   1P [T]    "Cube.009"                      25V       39I       25N       25T0  
-[ 103]       19,644 bytes   2P [T]    "CactusFlowers_2_Cube...       474V    2,238I      474N      474T0  
+[ 103]       19,644 bytes   1P [T]    "CactusFlowers_2_Cube...       474V    2,238I      474N      474T0  
 [ 104]       15,008 bytes   1P [T]    "Cactus_5_Cube.034"            364V    1,680I      364N      364T0  
 [ 105]       15,008 bytes   1P [T]    "CactusFlowers_5_Cube...       364V    1,680I      364N      364T0  
 [ 106]       65,100 bytes   1P [T]    "CactusFlower_1_Plane...     1,662V    5,958I    1,662N    1,662T0  
@@ -170,9 +170,9 @@ Materials:
 [  22] opaque       2S                "phx-green"
 [  23] opaque       2S                "asu-soil"
 [  24] opaque       2S                "asu-lite-rock"
-[  25] opaque       2S                "cactus-flower-pink"
```