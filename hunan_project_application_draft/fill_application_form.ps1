$ErrorActionPreference = "Stop"

$src = "C:\Users\sunmengfei\Desktop\hunan-mandarin-converter\鐩稿叧鏂囦欢\闄勪欢1锛?026骞村ぇ瀛︾敓鍒涙柊璁粌椤圭洰鐢宠涔?docx"
$dest = "C:\Users\sunmengfei\Desktop\hunan-mandarin-converter\鐩稿叧鏂囦欢\闄勪欢1锛?026骞村ぇ瀛︾敓鍒涙柊璁粌椤圭洰鐢宠涔?閫愭爮濉啓鐗?docx"

Copy-Item -LiteralPath $src -Destination $dest -Force

function Set-ParagraphText {
  param(
    [Parameter(Mandatory = $true)] $doc,
    [Parameter(Mandatory = $true)][int] $index,
    [Parameter(Mandatory = $true)][string] $text
  )

  $range = $doc.Paragraphs.Item($index).Range.Duplicate
  $range.End = $range.End - 1
  $range.Text = $text
}

function Set-CellText {
  param(
    [Parameter(Mandatory = $true)] $table,
    [Parameter(Mandatory = $true)][int] $row,
    [Parameter(Mandatory = $true)][int] $col,
    [Parameter(Mandatory = $true)][string] $text
  )

  $range = $table.Cell($row, $col).Range.Duplicate
  $range.End = $range.End - 1
  $range.Text = $text
}

$word = $null
$doc = $null

try {
  $word = New-Object -ComObject Word.Application
  $word.Visible = $false
  $word.DisplayAlerts = 0

  $doc = $word.Documents.Open($dest)

  Set-ParagraphText $doc 4 "鈻犲垱鏂拌缁?              鈻″垬涓氱繑鍒涙柊璧勫姪"
  Set-ParagraphText $doc 5 "鈻℃牎浼佸悎浣滃垱鏂?
  Set-ParagraphText $doc 6 "鏄惁鍚屾剰椤圭洰绫诲瀷璋冨墏锛氣枲鏄€€銆€銆€銆€    鈻″惁"
  Set-ParagraphText $doc 7 "椤圭洰绾у埆锛氣枲鍥藉绾э紙鐪佺骇锛?  鈻犳牎绾?
  Set-ParagraphText $doc 9 "鐢虫姤绫诲埆锛氣枲涓€鑸」鐩?   鈻￠噸鐐规敮鎸侀」鐩紙浠呴檺鍥藉绾с€佺渷绾у～鍐欙級"
  Set-ParagraphText $doc 10 "椤圭洰缂栧彿锛氭寜瀛︽牎缁熶竴濉啓"
  Set-ParagraphText $doc 11 "椤圭洰鍚嶇О锛氶潰鍚戦暱鏍江甯哥敤婀樿鍙ｈ鍦烘櫙鐨勬櫘閫氳瘽-鏂硅█鍙屽悜杞崲涓庤鏂欒緟鍔╃敓鎴愮郴缁?
  Set-ParagraphText $doc 12 "椤圭洰鎬ц川锛氣枲鏂扮敵鎶ラ」鐩?  鈻℃粴鍔ㄨ祫鍔╋紙鍘熼」鐩紪鍙凤細鏃狅級"
  Set-ParagraphText $doc 13 "椤圭洰璐熻矗浜猴細寰呰ˉ鍏?   鑱旂郴鐢佃瘽锛氬緟琛ュ厖"
  Set-ParagraphText $doc 14 "鎵€鍦ㄥ闄細寰呰ˉ鍏?
  Set-ParagraphText $doc 15 "瀛﹀彿锛氬緟琛ュ厖    涓撲笟鐝骇锛氬緟琛ュ厖"
  Set-ParagraphText $doc 16 "鎸囧鏁欏笀锛氬緟琛ュ厖"
  Set-ParagraphText $doc 17 "E-mail锛氬緟琛ュ厖"
  Set-ParagraphText $doc 18 "鐢宠鏃ユ湡锛?026骞?鏈?1鏃?
  Set-ParagraphText $doc 19 "璧锋骞存湀锛?026骞?鏈堣嚦2027骞?鏈?

  $basicTable = $doc.Tables.Item(1)
  Set-CellText $basicTable 1 2 "闈㈠悜闀挎牚娼父鐢ㄦ箻璇彛璇満鏅殑鏅€氳瘽-鏂硅█鍙屽悜杞崲涓庤鏂欒緟鍔╃敓鎴愮郴缁?
  Set-CellText $basicTable 2 3 "宸ュ"
  Set-CellText $basicTable 2 5 "璁＄畻鏈虹瀛︿笌鎶€鏈?
  Set-CellText $basicTable 3 2 "8000"
  Set-CellText $basicTable 3 4 "2026骞?鏈堣嚦2027骞?鏈?
  Set-CellText $basicTable 4 2 "寰呰ˉ鍏咃紙璐熻矗浜哄鍚嶏級"
  Set-CellText $basicTable 4 4 "寰呰ˉ鍏?
  Set-CellText $basicTable 4 6 "寰呰ˉ鍏?
  Set-CellText $basicTable 4 8 "寰呰ˉ鍏?
  Set-CellText $basicTable 5 2 "寰呰ˉ鍏?
  Set-CellText $basicTable 5 4 "寰呰ˉ鍏?
  Set-CellText $basicTable 5 6 "寰呰ˉ鍏?
  Set-CellText $basicTable 5 8 "寰呰ˉ鍏?
  Set-CellText $basicTable 6 2 "寰呰ˉ鍏?
  Set-CellText $basicTable 6 4 "瀹咃細寰呰ˉ鍏?   鎵嬫満锛氬緟琛ュ厖"
  Set-CellText $basicTable 6 6 "寰呰ˉ鍏?
  Set-CellText $basicTable 7 2 "寰呰ˉ鍏咃紙鎸囧鏁欏笀1锛?
  Set-CellText $basicTable 7 4 "瀹咃細寰呰ˉ鍏?   鎵嬫満锛氬緟琛ュ厖"
  Set-CellText $basicTable 7 6 "寰呰ˉ鍏?
  Set-CellText $basicTable 8 2 "寰呰ˉ鍏?
  Set-CellText $basicTable 8 4 "寰呰ˉ鍏?
  Set-CellText $basicTable 8 6 "寰呰ˉ鍏?
  Set-CellText $basicTable 9 2 "鏃?
  Set-CellText $basicTable 9 4 "瀹咃細鏃?   鎵嬫満锛氭棤"
  Set-CellText $basicTable 9 6 "鏃?
  Set-CellText $basicTable 10 2 "鏃?
  Set-CellText $basicTable 10 4 "鏃?
  Set-CellText $basicTable 10 6 "鏃?
  Set-CellText $basicTable 11 2 "寰呰ˉ鍏呫€傚缓璁粨鍚堟湰浜哄凡鍙備笌鐨勮绋嬮」鐩€佺▼搴忓紑鍙戙€佹暟鎹暣鐞嗐€侀棶鍗疯皟鐮斻€佺鐮旇缁冩垨绔炶禌缁忓巻濉啓锛岀獊鍑轰笌鏈」鐩浉鍏崇殑鎶€鏈熀纭€鍜岀爺绌跺叴瓒ｃ€?
  Set-CellText $basicTable 12 2 "寰呰ˉ鍏呫€傚缓璁～鍐欏亣鏈熻涔︺€佺ぞ浼氬疄璺点€佸湴鏂规枃鍖栬皟鐮斻€佽嚜涓昏缁冦€佸疄楠屽瀛︿範鎴栧鍑鸿璋堢瓑缁忓巻锛岀獊鍑鸿嚜涓诲涔犲拰瀹炶返鑳藉姏銆?
  Set-CellText $basicTable 13 2 "寰呰ˉ鍏呫€傚宸插弬鍔犱腑鍥藉浗闄呭ぇ瀛︾敓鍒涙柊澶ц禌銆佲€滈噾绉嶅瓙鏉€濄€侀潚骞寸孩鑹茬瓚姊︿箣鏃呫€佹寫鎴樻澂鎴栨牎鍐呭垱鏂板垱涓氭椿鍔紝鍙嵁瀹炲～鍐欒幏濂栥€佺珛椤规垨鍙傝禌鎯呭喌銆?
  Set-CellText $basicTable 14 2 "鐪侀儴绾э紙鍚級浠ヤ笂锛氳鍒掑弬鍔犱腑鍥藉浗闄呭ぇ瀛︾敓鍒涙柊澶ц禌銆佲€滈噾绉嶅瓙鏉€濈瓑璧涗簨锛屼簤鍙栬繘鍏ョ渷绾ч樁娈点€?
  Set-CellText $basicTable 14 3 "鏍＄骇锛氳鍒掑弬鍔犳牎绾у垱鏂拌缁冩垚鏋滃睍绀恒€佺▼搴忚璁″強瀛︾绔炶禌閫夋嫈娲诲姩銆?
  Set-CellText $basicTable 15 2 "鐪侀儴绾э紙鍚級浠ヤ笂锛氳鍒掑弬鍔犱腑鍥藉浗闄呭ぇ瀛︾敓鍒涙柊澶ц禌銆佲€滈噾绉嶅瓙鏉€濈瓑鍒涙柊鍒涗笟璧涗簨銆?
  Set-CellText $basicTable 15 3 "鏍＄骇锛氳鍒掑弬鍔犳牎绾у垱鏂板垱涓氳缁冭惀銆侀」鐩矾婕斿拰鐩稿叧鍒涗笟璧涗簨銆?
  Set-CellText $basicTable 16 2 "鏍″锛氭嫙寮€灞曟柟瑷€璁胯皥銆佹枃鏃呭満鏅〃杈鹃噰闆嗕笌鐢ㄦ埛娴嬭瘯銆?
  Set-CellText $basicTable 16 3 "鏍″唴锛?.鍒涘绌洪棿锛氭嫙鐢宠浣跨敤锛?.瀹為獙瀹わ細渚濇墭瀛﹂櫌瀹為獙鏉′欢寮€灞曟祴璇曪紱3.绉戠爺骞冲彴锛氬€熷姪鏍″唴鍒涙柊鍒涗笟骞冲彴锛?.鍏朵粬锛氬弬鍔犳牎鍐呴」鐩氦娴佹椿鍔ㄣ€?
  Set-CellText $basicTable 17 2 "1. 椤圭洰鑱氱劍鍦版柟鏂硅█鏁板瓧鍖栦笌鏅鸿兘璇█鏈嶅姟锛屽吋鍏锋枃鍖栦繚鎶ゅ拰鎶€鏈簲鐢ㄤ环鍊硷紱2. 鍥㈤槦宸插畬鎴愮綉椤靛師鍨嬶紝鍏峰鍓嶆湡寮€鍙戝熀纭€锛?. 鎷熷缓璁惧彲鎸佺画鎵╁睍鐨勬柟瑷€鐭ヨ瘑搴撳苟绉瀬鍙傚姞鍒涙柊鍒涗笟绔炶禌銆?
  Set-CellText $basicTable 18 2 "鏄?
  Set-CellText $basicTable 19 2 "寰呰ˉ鍏咃紙鐢辨寚瀵兼暀甯堟牴鎹疄闄呬富鎸佹垨鍙備笌鐨勭鐮旇棰樻儏鍐靛～鍐欙級"
  Set-CellText $basicTable 20 2 "鎸囧鏁欏笀灏嗕粠閫夐璁鸿瘉銆佽鏂欒鑼冦€佹妧鏈矾绾胯璁°€侀樁娈垫鏌ャ€佹垚鏋滄暣鐞嗗拰缁撻鏉愭枡鎾板啓绛夋柟闈㈢粰浜堝叏杩囩▼鎸囧锛屽苟鎻愪緵蹇呰鐨勫疄楠屾潯浠朵笌瀛︽湳寤鸿銆?
  Set-CellText $basicTable 22 2 "寰呰ˉ鍏咃紙鎴愬憳1锛?
  Set-CellText $basicTable 22 3 "寰呰ˉ鍏?
  Set-CellText $basicTable 22 4 "寰呰ˉ鍏?
  Set-CellText $basicTable 22 5 "寰呰ˉ鍏?
  Set-CellText $basicTable 22 6 "寰呰ˉ鍏?
  Set-CellText $basicTable 22 7 "寰呰ˉ鍏?
  Set-CellText $basicTable 22 8 "寰呰ˉ鍏?
  Set-CellText $basicTable 22 9 "璇枡閲囬泦涓庢柟瑷€鏍℃ / 绛惧悕寰呰ˉ"
  Set-CellText $basicTable 23 2 "寰呰ˉ鍏咃紙鎴愬憳2锛?
  Set-CellText $basicTable 23 3 "寰呰ˉ鍏?
  Set-CellText $basicTable 23 4 "寰呰ˉ鍏?
  Set-CellText $basicTable 23 5 "寰呰ˉ鍏?
  Set-CellText $basicTable 23 6 "寰呰ˉ鍏?
  Set-CellText $basicTable 23 7 "寰呰ˉ鍏?
  Set-CellText $basicTable 23 8 "寰呰ˉ鍏?
  Set-CellText $basicTable 23 9 "鍓嶇寮€鍙戜笌浜や簰璁捐 / 绛惧悕寰呰ˉ"
  Set-CellText $basicTable 24 2 "寰呰ˉ鍏咃紙鎴愬憳3锛?
  Set-CellText $basicTable 24 3 "寰呰ˉ鍏?
  Set-CellText $basicTable 24 4 "寰呰ˉ鍏?
  Set-CellText $basicTable 24 5 "寰呰ˉ鍏?
  Set-CellText $basicTable 24 6 "寰呰ˉ鍏?
  Set-CellText $basicTable 24 7 "寰呰ˉ鍏?
  Set-CellText $basicTable 24 8 "寰呰ˉ鍏?
  Set-CellText $basicTable 24 9 "瑙勫垯璁捐涓庢暟鎹鐞?/ 绛惧悕寰呰ˉ"
  Set-CellText $basicTable 25 2 "寰呰ˉ鍏咃紙鎴愬憳4锛?
  Set-CellText $basicTable 25 3 "寰呰ˉ鍏?
  Set-CellText $basicTable 25 4 "寰呰ˉ鍏?
  Set-CellText $basicTable 25 5 "寰呰ˉ鍏?
  Set-CellText $basicTable 25 6 "寰呰ˉ鍏?
  Set-CellText $basicTable 25 7 "寰呰ˉ鍏?
  Set-CellText $basicTable 25 8 "寰呰ˉ鍏?
  Set-CellText $basicTable 25 9 "娴嬭瘯璇勪及涓庢枃妗ｆ暣鐞?/ 绛惧悕寰呰ˉ"

  Set-ParagraphText $doc 2 "鏈」鐩潰鍚戦暱鏍江甯哥敤婀樿鍙ｈ鍦烘櫙锛屾嫙鏋勫缓涓€濂楁櫘閫氳瘽-鏂硅█鍙屽悜杞崲涓庤鏂欒緟鍔╃敓鎴愮郴缁熴€傞」鐩互鍦版柟楂橀鍙ｈ琛ㄨ揪涓哄璞★紝閲嶇偣鏈嶅姟鏍″洯浜ゆ祦銆佹棩甯哥敓娲汇€佹枃鏃呬紶鎾拰鐭棰戣〃杈剧瓑鍦烘櫙銆?
  Set-ParagraphText $doc 3 "绯荤粺灏嗗湪鐜版湁缃戦〉鍘熷瀷鍩虹涓婄户缁畬鍠勶紝鍥寸粫璇嶆眹鏄犲皠銆佸彞寮忚浆鎹€佹嫾闊冲閿欍€佸€欓€夌粨鏋滆緭鍑哄拰璇嶅簱瀹℃牳缁存姢绛夊姛鑳藉睍寮€锛屽舰鎴愨€滆鏂欏缓璁?瑙勫垯璁捐+绯荤粺瀹炵幇+鏁堟灉璇勬祴鈥濈殑瀹屾暣椤圭洰閾炬潯銆?
  Set-ParagraphText $doc 4 "椤圭洰鎷熼噰鐢ㄢ€滆瘝鍏哥簿纭尮閰?鎷奸煶杩戜技绾犻敊+鍙ュ紡瑙勫垯鐢熸垚+鍊欓€夌粨鏋滄帓搴忊€濈殑铻嶅悎鏂规硶锛屾彁鍗囧湪鐪熷疄鍙ｈ杈撳叆鏉′欢涓嬬殑杞崲鍑嗙‘鎬с€佽嚜鐒跺害鍜屽彲鐞嗚В鎬с€?
  Set-ParagraphText $doc 5 "棰勬湡褰㈡垚涓€涓彲婕旂ず銆佸彲鎵╁睍銆佸彲鎸佺画缁存姢鐨勬柟瑷€杞崲鍘熷瀷绯荤粺锛屽悓鏃舵矇娣€闀挎牚娼父鐢ㄦ箻璇瘝鍙ヨ祫婧愶紝涓烘箹鍗楁柟瑷€鏁板瓧鍖栦繚鎶や笌璇█鏈嶅姟瀹炶返鎻愪緵鍩虹銆?
  Set-ParagraphText $doc 7 "1. 寤鸿瑕嗙洊鏍″洯鐢熸椿銆佹棩甯镐氦娴佸拰鏂囨梾娌熼€氱瓑鍦烘櫙鐨勯暱鏍江甯哥敤婀樿璇嶅彞鐭ヨ瘑搴撱€?
  Set-ParagraphText $doc 8 "2. 璁捐鏅€氳瘽涓庢柟瑷€鍙屽悜杞崲瑙勫垯锛屾彁楂樼郴缁熷鐭彞鍜屽彛璇〃杈剧殑杞崲鑳藉姏銆?
  Set-ParagraphText $doc 9 "3. 寮曞叆鎷奸煶瀹归敊涓庡€欓€夌粨鏋滄満鍒讹紝澧炲己绯荤粺瀵瑰悓闊抽敊瀛椼€佹ā绯婅緭鍏ュ拰涓€璇嶅璇寸幇璞＄殑閫傚簲鎬с€?
  Set-ParagraphText $doc 10 "4. 褰㈡垚Web鍘熷瀷銆佺爺绌舵姤鍛娿€佽鏂欒祫婧愬拰绔炶禌灞曠ず鏉愭枡锛屽畬鎴愬ぇ瀛︾敓鍒涙柊璁粌椤圭洰鐨勯樁娈垫垚鏋滀笌缁撻瑕佹眰銆?
  Set-ParagraphText $doc 12 "1. 璇枡寤鸿锛氶噰闆嗗苟鏁寸悊闀挎牚娼父鐢ㄦ箻璇珮棰戣瘝姹囥€佺煭璇€佽姘旇瘝鍜屽満鏅彞寮忥紝褰㈡垚鍩虹骞宠璇枡銆?
  Set-ParagraphText $doc 13 "2. 瑙勫垯璁捐锛氫粠璇嶆眹灞備笌鍙ュ紡灞備袱鏂归潰鏋勫缓鍙屽悜杞崲瑙勫垯锛屽鐞嗙О璋撱€佹椂闂磋瘝銆佸惁瀹氬彞銆佺枒闂彞鍜岄珮棰戝彛璇ā鏉裤€?
  Set-ParagraphText $doc 14 "3. 绯荤粺瀹炵幇锛氬湪鐜版湁缃戦〉鍩虹涓婂畬鍠勫弻鍚戣浆鎹€佽瘝搴撶鐞嗐€佽瘝鏉″鏍搞€丣SON瀵煎叆瀵煎嚭銆佸€欓€夌粨鏋滄樉绀哄拰鍦烘櫙鍒囨崲绛夊姛鑳姐€?
  Set-ParagraphText $doc 15 "4. 鏁堟灉璇勬祴锛氭瀯寤烘祴璇曟牱鏈苟寮€灞曚汉宸ヨ瘎鍒嗭紝浠庡噯纭€с€佽嚜鐒跺害銆佸彲鐞嗚В鎬у拰瀹炵敤鎬у洓涓淮搴﹁瘎浼扮郴缁熸晥鏋溿€?
  Set-ParagraphText $doc 17 "鐩墠鏅€氳瘽鐩稿叧鑷劧璇█澶勭悊鎶€鏈緝涓烘垚鐔燂紝浣嗛潰鍚戠粏鍒嗗湴鏂规柟瑷€灏ゅ叾鏄綆璧勬簮鏂硅█鐨勬暟瀛楀寲宸ュ叿浠嶇劧涓嶈冻銆傜幇鏈夊伐浣滃闆嗕腑浜庤瘝鍏告暣鐞嗐€佽闊宠瘑鍒垨澶фā鍨嬫硾鍖栧簲鐢紝瀵归暱鏍江甯哥敤婀樿杩欑被鍙ｈ鍦烘櫙鐨勯拡瀵规€ф敮鎸佽緝寮便€?
  Set-ParagraphText $doc 18 "宸叉湁鏂硅█璧勬簮骞冲彴澶у鍋忛噸闈欐€佸睍绀猴紝缂哄皯鍙屽悜杞崲銆佽瘝搴撳姩鎬佺淮鎶ゃ€佸€欓€夎〃杈炬帹鑽愬拰鏁堟灉璇勬祴绛夋ā鍧楋紱鑰岀函鏁版嵁椹卞姩鏂规硶鍙堝線寰€渚濊禆澶ц妯¤鑼冭鏂欙紝闅句互鐩存帴閫傜敤浜庢湰椤圭洰鎵€闈㈠鐨勫湴鏂瑰彛璇祫婧愭潯浠躲€?
  Set-ParagraphText $doc 19 "鍦ㄦ箹鍗楁柟瑷€鐩稿叧搴旂敤涓紝甯歌鎴愭灉澶氫负闆舵暎璇嶆潯銆佺煭瑙嗛绉戞櫘鎴栧ū涔愬寲琛ㄨ揪杞崲锛屽皻缂哄皯闈㈠悜鐪熷疄楂橀鍦烘櫙銆佸叿澶囦竴瀹氬彲瑙ｉ噴鎬у拰鍙墿灞曟€х殑杞婚噺绾ц浆鎹㈢郴缁熴€?
  Set-ParagraphText $doc 20 "鍥犳锛屾湰椤圭洰鎷熼噰鐢ㄢ€滃皬鑼冨洿鑱氱劍銆佽鍒欓┍鍔ㄤ负涓汇€佺煡璇嗗簱鎸佺画杩唬鈥濈殑鎬濊矾锛屾帰绱竴绉嶆洿閫傚悎澶у鐢熷垱鏂拌缁冨疄鏂芥潯浠剁殑鏂硅█鏁板瓧鍖栬矾寰勩€?
  Set-ParagraphText $doc 22 "1. 鑱氱劍闀挎牚娼父鐢ㄦ箻璇彛璇満鏅紝閬垮厤鈥滄箹鍗楁柟瑷€鈥濊寖鍥磋繃澶у鑷寸殑鐮旂┒绌烘硾銆?. 閲囩敤鈥滆瘝鍏稿尮閰?鎷奸煶瀹归敊+鍙ュ紡瑙勫垯鈥濈殑铻嶅悎鏂规硶锛屽湪浣庤祫婧愭潯浠朵笅鍏奸【鏁堟灉涓庡彲瑙ｉ噴鎬с€?
  Set-ParagraphText $doc 23 "3. 寤虹珛甯﹀鏍告満鍒剁殑鏂硅█鐭ヨ瘑搴擄紝瀹炵幇璇嶆潯鏂板銆佸緟瀹°€侀€氳繃鍜岀敓鏁堢殑闂幆缁存姢銆?. 寮曞叆鍊欓€夌粨鏋滀笌杞崲渚濇嵁璇存槑锛屼娇绯荤粺浠庡崟涓€缈昏瘧杈撳嚭杞悜杈呭姪鐞嗚В涓庤〃杈惧缓璁€?
  Set-ParagraphText $doc 25 "鎶€鏈矾绾匡細闇€姹傚垎鏋愪笌鑼冨洿鐣屽畾鈫掕鏂欓噰闆嗕笌娓呮礂鈫掓柟瑷€鐭ヨ瘑搴撴瀯寤衡啋璇嶅吀鍖归厤妯″潡鈫掓嫾闊冲閿欐ā鍧椻啋鍙ュ紡瑙勫垯妯″潡鈫掑€欓€夋帓搴忎笌瑙ｉ噴杈撳嚭鈫扺eb绯荤粺灞曠ず鈫掍汉宸ヨ瘎娴嬩笌杩唬浼樺寲銆?
  Set-ParagraphText $doc 26 "鎷熻В鍐崇殑涓昏闂鍖呮嫭鏂硅█璇枡鍒嗘暎銆佸彞瀛愮骇杞崲涓嶈冻銆佸彛璇緭鍏ュ閿欒兘鍔涘急鍜岀郴缁熺粨鏋滆В閲婃€т笉瓒炽€傞鏈熸垚鏋滃寘鎷細瀹屾垚涓€涓弻鍚戣浆鎹eb鍘熷瀷绯荤粺銆佸舰鎴愬熀纭€鏂硅█璇枡搴撳拰鐮旂┒鎶ュ憡锛屼簤鍙栨暣鐞嗚蒋浠惰憲浣滄潈鐢宠鏉愭枡骞剁敤浜庣浉鍏冲垱鏂板垱涓氱珵璧涘睍绀恒€?
  Set-ParagraphText $doc 28 "2026骞?鏈堣嚦2026骞?鏈堬細瀹屾垚椤圭洰璋冪爺銆佸満鏅垝鍒嗐€佸洟闃熷垎宸ャ€佽鏂欓噰闆嗗拰鍩虹璇嶅彞鐭ヨ瘑搴撳缓璁撅紱2026骞?鏈堣嚦2026骞?1鏈堬細瀹屾垚鍙屽悜杞崲鏍稿績妯″潡銆佸彞寮忚鍒欏拰璇嶅簱缁存姢鍔熻兘寮€鍙戯紝骞跺紑灞曢樁娈垫祴璇曘€?
  Set-ParagraphText $doc 29 "2026骞?2鏈堬細瀹屾垚涓湡妫€鏌ヤ笌闃舵浼樺寲锛?027骞?鏈堣嚦2027骞?鏈堬細寮€灞曚汉宸ヨ瘎鍒嗗拰鍦烘櫙娴嬭瘯锛屽畬鎴愮爺绌舵姤鍛娿€佸睍绀烘潗鏂欍€佺粨棰樻枃妗ｅ強杞欢钁椾綔鏉冪浉鍏冲噯澶囥€?
  Set-ParagraphText $doc 32 "鍥㈤槦鐩墠宸插畬鎴愮綉椤靛師鍨嬪紑鍙戯紝绯荤粺宸插叿澶囨櫘閫氳瘽涓庢柟瑷€鍙屽悜杞崲銆佸熀纭€璇嶅簱鏄犲皠銆佹嫾闊宠繎浼肩籂閿欍€佽瘝搴撳湪绾跨紪杈戙€佸緟瀹℃牳闃熷垪銆丣SON瀵煎叆瀵煎嚭鍜屾仮澶嶉粯璁よ瘝搴撶瓑鍔熻兘銆?
  Set-ParagraphText $doc 33 "涓婅堪鍘熷瀷璇存槑鏈」鐩苟闈炰粠闆跺紑濮嬶紝鑰屾槸宸茬粡鍏峰鍙繍琛屻€佸彲婕旂ず銆佸彲鎵╁睍鐨勫墠鏈熷熀纭€銆傚悗缁伐浣滃皢鍦ㄨ鏂欒妯°€佸彞寮忚鍒欍€佸€欓€夌粨鏋溿€佽瘎娴嬫満鍒跺拰绯荤粺瀹屾暣鎬ф柟闈㈣繘涓€姝ユ繁鍖栥€?
  Set-ParagraphText $doc 35 "宸插叿澶囩殑鏉′欢锛氬凡褰㈡垚鍒濇Web鍘熷瀷锛屽叿澶囧墠绔紑鍙戜笌鍩虹鏁版嵁澶勭悊鏉′欢锛涚爺绌跺璞¤创杩戞棩甯哥敓娲伙紝渚夸簬寮€灞曡璋堛€侀棶鍗峰拰浜哄伐鏍″銆?
  Set-ParagraphText $doc 36 "灏氱己灏戠殑鏉′欢锛氱郴缁熷寲鐨勯暱鏍江婀樿璇嶅彞璇枡銆佹洿鍔犲畬鍠勭殑鍙ュ紡瑙勫垯銆佹爣鍑嗗寲璇勬祴闆嗕互鍙婇儴鍒嗗甯堜笌鎴愬憳涓汉淇℃伅浠嶉渶杩涗竴姝ヨˉ鍏呫€?
  Set-ParagraphText $doc 37 "瑙ｅ喅鏂规硶锛氶噰鐢ㄢ€滃厛楂橀銆佸悗鎵╁睍鈥濈殑璇枡寤鸿绛栫暐锛岄€氳繃瀹炲湴璁胯皥銆佹牎鍥棶鍗峰拰浜哄伐鏍℃閫愭瀹屽杽鐭ヨ瘑搴擄紱鍦ㄩ」鐩疄鏂借繃绋嬩腑鍒嗛樁娈佃凯浠ｈ鍒欎笌璇勬祴妯″潡锛屽苟鍦ㄦ寚瀵兼暀甯堟寚瀵间笅鎸佺画浼樺寲绯荤粺銆?

  $budgetTable = $doc.Tables.Item(3)
  Set-CellText $budgetTable 3 2 "8000"
  Set-CellText $budgetTable 3 3 "椤圭洰鎬婚绠楋紝涓昏鐢ㄤ簬璇枡閲囬泦銆佺郴缁熷紑鍙戞祴璇曘€佹枃鐚绱€佹潗鏂欐暣鐞嗕笌鎴愭灉灞曠ず銆?
  Set-CellText $budgetTable 3 4 "4000"
  Set-CellText $budgetTable 3 5 "4000"
  Set-CellText $budgetTable 4 2 "4500"
  Set-CellText $budgetTable 4 3 "鐢ㄤ簬鏁版嵁鏁寸悊銆佸姛鑳芥祴璇曘€佽皟鐮斾氦娴併€佽祫鏂欐绱笌鎴愭灉鏁寸悊绛変笟鍔℃€ф敮鍑恒€?
  Set-CellText $budgetTable 4 4 "2350"
  Set-CellText $budgetTable 4 5 "2150"
  Set-CellText $budgetTable 5 2 "1200"
  Set-CellText $budgetTable 5 3 "鐢ㄤ簬绯荤粺鍔熻兘娴嬭瘯銆佹牱鏈暟鎹暣鐞嗐€佷汉宸ヨ瘎鍒嗙粺璁″拰鎬ц兘鍒嗘瀽銆?
  Set-CellText $budgetTable 5 4 "700"
  Set-CellText $budgetTable 5 5 "500"
  Set-CellText $budgetTable 6 2 "300"
  Set-CellText $budgetTable 6 3 "鐢ㄤ簬椤圭洰寮€鍙戙€佹祴璇曞拰璁惧杩愯涓殑蹇呰鑳芥簮鍔ㄥ姏鏀嚭銆?
  Set-CellText $budgetTable 6 4 "150"
  Set-CellText $budgetTable 6 5 "150"
  Set-CellText $budgetTable 7 2 "1800"
  Set-CellText $budgetTable 7 3 "鐢ㄤ簬鏂硅█璁胯皥銆佸疄鍦拌皟鐮斻€佺敤鎴锋祴璇曞拰椤圭洰闃舵浜ゆ祦宸梾鏀嚭銆?
  Set-CellText $budgetTable 7 4 "800"
  Set-CellText $budgetTable 7 5 "1000"
  Set-CellText $budgetTable 8 2 "600"
  Set-CellText $budgetTable 8 3 "鐢ㄤ簬鏂囩尞鏌ラ槄銆佽祫鏂欎笅杞姐€侀棶鍗锋墦鍗板拰璋冪爺鏉愭枡鏁寸悊銆?
  Set-CellText $budgetTable 8 4 "400"
  Set-CellText $budgetTable 8 5 "200"
  Set-CellText $budgetTable 9 2 "600"
  Set-CellText $budgetTable 9 3 "鐢ㄤ簬鐮旂┒鎶ュ憡銆佹垚鏋滄潗鏂欐帓鐗堝拰璁烘枃鍒濈鏁寸悊绛夋敮鍑恒€?
  Set-CellText $budgetTable 9 4 "300"
  Set-CellText $budgetTable 9 5 "300"
  Set-CellText $budgetTable 10 2 "800"
  Set-CellText $budgetTable 10 3 "鐢ㄤ簬渚挎惡褰曢煶銆佸瓨鍌ㄥ強蹇呰娴嬭瘯澶栬鐨勮喘缃€?
  Set-CellText $budgetTable 10 4 "500"
  Set-CellText $budgetTable 10 5 "300"
  Set-CellText $budgetTable 11 2 "500"
  Set-CellText $budgetTable 11 3 "鐢ㄤ簬灏忓瀷閲囬泦涓庡睍绀鸿缃皟璇曘€佽瘯鍒跺拰鍔熻兘楠岃瘉銆?
  Set-CellText $budgetTable 11 4 "300"
  Set-CellText $budgetTable 11 5 "200"
  Set-CellText $budgetTable 12 2 "2200"
  Set-CellText $budgetTable 12 3 "鐢ㄤ簬璇枡鏍囨敞銆佹祴璇曡褰曘€佸睍绀烘潗鏂欏埗浣溿€佸姙鍏€楁潗鍙婄浉鍏虫敮鍑恒€?
  Set-CellText $budgetTable 12 4 "850"
  Set-CellText $budgetTable 12 5 "1350"
  Set-CellText $budgetTable 13 2 "寰呭鏍″鎵?

  Set-CellText $doc.Tables.Item(5) 1 1 "鎸囧鏁欏笀鎰忚锛氳椤圭洰鑱氱劍闀挎牚娼父鐢ㄦ箻璇彛璇満鏅紝鍏锋湁涓€瀹氬垱鏂版€у拰瀹炶返浠峰€笺€傚洟闃熷凡瀹屾垚鍓嶆湡缃戦〉鍘熷瀷锛屽叿澶囩户缁紑灞曡鏂欐暣鐞嗐€佽鍒欒璁″拰绯荤粺瀹炵幇鐨勫熀纭€銆傜爺绌剁洰鏍囨槑纭紝鎶€鏈矾绾胯緝娓呮櫚锛屽伐浣滈噺涓庨」鐩懆鏈熷尮閰嶏紝寤鸿绔嬮」銆俙n瀵煎笀锛堢绔狅級锛氬緟琛ュ厖    骞?  鏈?  鏃?
  Set-CellText $doc.Tables.Item(6) 1 1 "瀛﹂櫌澶у鐢熷垱鏂拌缁冭鍒掍笓瀹剁粍鎰忚锛氶」鐩€夐鍏锋湁鍦版柟鐗硅壊鍜屽簲鐢ㄤ环鍊硷紝鍓嶆湡鍩虹杈冨ソ锛屾柟妗堣緝瀹屾暣锛屽彲浣滀负澶у鐢熷垱鏂拌缁冮」鐩煿鑲诧紝寤鸿鎺ㄨ崘绔嬮」銆俙n涓撳缁勭粍闀匡紙绛剧珷锛夛細寰呭闄㈠～鍐?   骞?  鏈?  鏃?
  Set-CellText $doc.Tables.Item(7) 1 1 "瀛︽牎澶у鐢熷垱鏂拌缁冭鍒掍笓瀹剁粍鎰忚锛氬緟瀛︽牎璇勫濉啓銆俙n璐熻矗浜猴紙绛剧珷锛夛細    骞?  鏈?  鏃?
  Set-CellText $doc.Tables.Item(8) 1 1 "澶у鐢熷垱鏂拌缁冭鍒掗瀵煎皬缁勫鎵规剰瑙侊細寰呭鏍″鎵瑰～鍐欍€俙n璐熻矗浜猴紙绛剧珷锛夛細    骞?  鏈?  鏃?

  $doc.Save()
  $doc.Close()
  $word.Quit()
}
finally {
  if ($doc -ne $null) {
    try { [void][System.Runtime.InteropServices.Marshal]::ReleaseComObject($doc) } catch {}
  }
  if ($word -ne $null) {
    try { [void][System.Runtime.InteropServices.Marshal]::ReleaseComObject($word) } catch {}
  }
  [GC]::Collect()
  [GC]::WaitForPendingFinalizers()
}
