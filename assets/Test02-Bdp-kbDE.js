import{_ as o,c as f,b as t,e as n,w as u,s as m,q as N,h as p,t as i,v as d,o as b}from"./index-gKlSlCB_.js";const v={data(){return{isActive:!0,hasError:!0,classObject:{border:!0,bg:!0,"text-danger":!1},bgClass:"bg",erClass:"text-danger",isActive:!0,myWidth:200,chk:!1,firstName:"",lastName:"",firstName1:"",lastName1:""}},methods:{increWidth(){this.myWidth+=10},decreWidth(){this.myWidth-=10},mOver(){this.myWidth=200}},computed:{yesNo(){return this.chk?"참 말":"거 짓"},fullName0(){return this.firstName+" "+this.lastName},fullName1:{get(){return this.firstName1+" "+this.lastName1},set(a){const e=a.split(" ");this.firstName1=e[0],this.lastName1=e[e.length-1]}},test:{get(){return this.firstName+" "+this.lastName}}}};function y(a,e,g,x,l,s){return b(),f("div",null,[e[7]||(e[7]=t("hr",null,null,-1)),e[8]||(e[8]=n("css class 변경 방법 등...3항연산추가 ",-1)),t("div",{class:m(["border",{bg:l.isActive,"text-danger":l.hasError}])},"Warning",2),t("div",{class:m(l.classObject)},"Warning",2),t("div",{class:m(["border",[l.bgClass,l.erClass]])},"Warning",2),e[9]||(e[9]=t("hr",null,null,-1)),e[10]||(e[10]=n(" style bind 기술할때 v-bind:style or :style / style는 같은 속성일경우 마지막에 기술된것이 적용된다. ",-1)),t("div",{class:"demo",style:N([{width:"200px",height:"150px"},{width:"250px"}])}),t("div",{class:"demo2",style:N({width:l.myWidth+"px",color:"white"}),onMouseover:e[0]||(e[0]=(...r)=>s.mOver&&s.mOver(...r))}," 마우스 over 면 초기화 됩니다.",36),t("button",{onClick:e[1]||(e[1]=(...r)=>s.increWidth&&s.increWidth(...r))}," 누르면 width 증가"),t("button",{onClick:e[2]||(e[2]=(...r)=>s.decreWidth&&s.decreWidth(...r))}," 누르면 width 감소"),e[11]||(e[11]=t("hr",null,null,-1)),e[12]||(e[12]=n(" computed (종속 데이터 변경 시 자동 재계산, 또는 최초 렌더링 시) ",-1)),e[13]||(e[13]=t("br",null,null,-1)),u(t("input",{type:"checkbox","onUpdate:modelValue":e[3]||(e[3]=r=>l.chk=r)},null,512),[[p,l.chk]]),n(i(s.yesNo)+" "+i(s.yesNo)+" "+i(s.yesNo)+" ",1),e[14]||(e[14]=t("br",null,null,-1)),n("fullName0 (Getter만) 이름 : "+i(s.fullName0)+" / "+i(s.test)+" ",1),e[15]||(e[15]=t("br",null,null,-1)),e[16]||(e[16]=n(" 성 : ",-1)),u(t("input",{type:"text","onUpdate:modelValue":e[4]||(e[4]=r=>l.firstName=r),placeholder:"성을 입력하세요"},null,512),[[d,l.firstName]]),e[17]||(e[17]=n(" 이름 : ",-1)),u(t("input",{type:"text","onUpdate:modelValue":e[5]||(e[5]=r=>l.lastName=r),placeholder:"이름을 입력하세요"},null,512),[[d,l.lastName]]),e[18]||(e[18]=t("pre",null,`computed: {
        fullName0() {
            return this.firstName + ' ' + this.lastName;
        },

        test:{
            get() {
                return this.firstName + ' ' + this.lastName;
            },
        }
    }
둘다 사용가능.    
`,-1)),e[19]||(e[19]=t("hr",null,null,-1)),e[20]||(e[20]=n(" fullName1 (Getter + Setter) 이름을 입력하세요. (성과 이름은 띄어쓰기) : ",-1)),u(t("input",{type:"text","onUpdate:modelValue":e[6]||(e[6]=r=>s.fullName1=r),placeholder:"이름을 입력하세요"},null,512),[[d,s.fullName1]]),e[21]||(e[21]=t("br",null,null,-1)),n("성 : "+i(l.firstName1)+" / 이름 : "+i(l.lastName1)+" ",1),e[22]||(e[22]=t("br",null,null,-1)),n("풀네임 : "+i(s.fullName1)+" ",1),e[23]||(e[23]=t("pre",null,`computed: {
    fullName1: {
        get() {
            return this.firstName1 + ' ' + this.lastName1;
        },
        set(newValue) { // fullName1 에 입력된 값을 param 으로 받아옴.(여기선 input text 에 v-model 선언되어 있음)
            const names1 = newValue.split(' ');
            this.firstName1 = names1[0];
            this.lastName1 = names1[names1.length - 1];
            //그러나 글자쓸때 무조건 반응 하므로  .split(' '); 에서 버그처럼 반응함.
        }
    },
}        
    `,-1))])}const h=o(v,[["render",y],["__scopeId","data-v-4702fd7e"]]);export{h as default};
