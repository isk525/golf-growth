export const DIRECTIONS=['左大','左','中央','右','右大']
export const HEIGHTS=['低い','普通','高い']
export const MISS_OPTIONS=[
 {id:'slice',name:'スライス',icon:'↗',description:'打ち出した後、右へ大きく曲がる'},
 {id:'hook',name:'フック',icon:'↖',description:'打ち出した後、左へ曲がる'},
 {id:'duckHook',name:'チーピン',icon:'↶',description:'低く出て、急激に左へ曲がる強いミス'},
 {id:'sky',name:'天ぷら',icon:'↑',description:'真上へ高く上がり、飛距離が出ない'},
 {id:'top',name:'トップ',icon:'⇢',description:'ボール上部を打ち、低く転がる・飛ぶ'},
 {id:'fat',name:'ダフリ',icon:'⌄',description:'ボールより手前の地面を先に打つ'},
 {id:'pull',name:'引っかけ',icon:'←',description:'曲がる前から、最初から左へ飛ぶ'},
 {id:'push',name:'プッシュ',icon:'→',description:'曲がる前から、最初から右へ飛ぶ'}
]
export const TIPS={
 relax:['力を抜いて7割で振る','切り返しを急がず、一定のテンポで振ります。'],
 finish:['フィニッシュまで振り切る','当てにいかず、胸が目標方向を向くまで回転します。'],
 strong:['左手のナックルを少し多く見せる','フェースが開く傾向を小さく調整します。'],
 neutral:['グリップをニュートラルへ戻す','フェースが閉じる傾向を小さく調整します。'],
 teeLow:['ティーを少し低くする','高すぎる弾道や天ぷらの変化を確認します。'],
 teeHigh:['ティーを少し高くする','低すぎる弾道の変化を確認します。'],
 ballBack:['ボール位置を半個右へ','最下点と当たり方の変化を確認します。'],
 leftWeight:['左足体重を保つ','アプローチで体重移動を抑えます。'],
 chest:['手だけでなく胸で運ぶ','手首をこねず、胸とクラブを一緒に動かします。'],
 keepHeight:['前傾と頭の高さを保つ','上下動を減らして当たり方を安定させます。'],
 short:['振り幅を一段小さくする','芯に当たりやすい振り幅から再開します。'],
 aim:['フェースを合わせてから足を置く','目標線に対する構えのずれを減らします。'],
 tempo:['「1・2」のテンポで振る','バックスイングと切り返しのリズムを揃えます。'],
 putt:['頭を残してボールの跡を見る','打ち出し方向を安定させます。']
}
const rules=[
 {miss:['slice'],tips:['relax','finish','strong']},{miss:['hook','duckHook','pull'],tips:['neutral','aim','tempo']},
 {miss:['sky'],tips:['teeLow','keepHeight','short']},{miss:['top'],tips:['keepHeight','short','ballBack']},
 {miss:['fat'],tips:['ballBack','keepHeight','tempo']},{miss:['push'],tips:['finish','aim','tempo']},
 {direction:['右','右大'],tips:['finish','strong','aim']},{direction:['左','左大'],tips:['aim','neutral','relax']},
 {club:['ウェッジ'],miss:['top','fat'],tips:['leftWeight','chest','short']},{club:['パター'],tips:['putt','aim','tempo']},
 {height:['高い'],club:['ドライバー'],tips:['teeLow','relax','short']},{height:['低い'],club:['ドライバー'],tips:['teeHigh','finish','tempo']}
]
const points={'◎':1,'○':.7,'△':.25,'×':0}
export function suggest(logs,form){
 let ids=[]
 rules.forEach(rule=>{const okClub=!rule.club||rule.club.includes(form.club),okDirection=!rule.direction||rule.direction.includes(form.direction),okHeight=!rule.height||rule.height.includes(form.height),okMiss=!rule.miss||form.misses.some(x=>rule.miss.includes(x));if(okClub&&okDirection&&okHeight&&okMiss)ids.push(...rule.tips)})
 ids=[...new Set(ids.length?ids:['relax','tempo','short'])]
 return ids.map((id,index)=>{const own=logs.filter(x=>x.club===form.club&&x.tipId===id&&(form.misses.length===0||x.misses.some(m=>form.misses.includes(m))));const avg=own.length?own.reduce((s,x)=>s+(points[x.result]??0),0)/own.length:null;return{id,title:TIPS[id][0],detail:TIPS[id][1],trials:own.length,rate:avg===null?null:Math.round(avg*100),score:100-index+(avg??0)*80+Math.min(own.length,10)*2}}).sort((a,b)=>b.score-a.score).slice(0,3)
}
export function stats(logs){const issues={},tips={};logs.forEach(x=>{x.misses.forEach(id=>{const name=MISS_OPTIONS.find(m=>m.id===id)?.name||id;const key=`${x.club}｜${name}`;issues[key]=(issues[key]||0)+1});if(x.tipId){tips[x.tipId]??={n:0,sum:0};tips[x.tipId].n++;tips[x.tipId].sum+=points[x.result]??0}});return{issues:Object.entries(issues).sort((a,b)=>b[1]-a[1]).slice(0,3),tips:Object.entries(tips).map(([id,v])=>({id,title:TIPS[id]?.[0]||id,n:v.n,rate:Math.round(v.sum/v.n*100)})).sort((a,b)=>b.rate-a.rate||b.n-a.n).slice(0,3)}}
