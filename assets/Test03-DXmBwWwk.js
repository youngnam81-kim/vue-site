import{_ as r,c as i,b as t,e as u,w as c,t as a,v as h,o as d}from"./index-BMaYk8UO.js";const p={data(){return{count:0,y:"짝수",changeCount:""}},methods:{increment(){this.count++}},watch:{count:{handler(l,n){this.changeCount=` count change ${n} => ${l} `,l%2===0?this.y="짝수":this.y="홀수"},once:!1}}};function V(l,n,f,g,e,s){return d(),i("div",null,[n[2]||(n[2]=t("hr",null,null,-1)),n[3]||(n[3]=u(" watch (감시자) - 반응형 속성이 변경 될때마다 함수를 호출(트리거)할수있음. ",-1)),t("p",null,[u("Count: "+a(e.count)+" ",1),c(t("input",{type:"text","onUpdate:modelValue":n[0]||(n[0]=o=>e.changeCount=o)},null,512),[[h,e.changeCount]])]),t("button",{onClick:n[1]||(n[1]=(...o)=>s.increment&&s.increment(...o))},"increment"),t("p",null,"RESULT:"+a(e.y),1),n[4]||(n[4]=t("pre",null,`watch:{
        count(newVal, oldVal){
            this.changeCount = \` count change \${oldVal} => \${newVal} \`;
            if(newVal % 2 ===0 ){
                this.y='짝수';
            }else{
                this.y='홀수';
            }
        }

         count: {
            handler(newVal, oldVal) {
                this.changeCount = \` count change \${oldVal} => \${newVal} \`;
                if (newVal % 2 === 0) {
                    this.y = '짝수';
                } else {
                    this.y = '홀수';
                }
            },
            once: true, // 이렇게 하면 한번만 변화 추적함. true/false 사용가능
    }`,-1)),n[5]||(n[5]=t("hr",null,null,-1))])}const w=r(p,[["render",V],["__scopeId","data-v-60217583"]]);export{w as default};
