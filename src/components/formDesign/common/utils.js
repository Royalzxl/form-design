import Input from '../module/Input'
import Textarea from '../module/Textarea'
import Caption from '../module/Caption'
import Number from '../module/Number'
import Switch from '../module/Switch'
import Radio from '../module/Radio'
import Checkbox from '../module/Checkbox'
import Date from '../module/Date'
import DateRange from '../module/DateRange'
import UploadImg from '../module/UploadImg'
import Attachment from '../module/Attachment'
import Amount from '../module/Amount'
import CFormula from '../module/CFormula'
import Account from '../module/Account'
import Approval from '../module/Approval'
import Contact from '../module/Contact'
import Department from '../module/Department'
import Details from '../module/Details'

/**
 * @description 生成组件实例
 * @method newObject
 * @param { String } data 列表对象
 * @return { Object } 返回 组件数据对象
 * */
export const newObject = data => {
    let component = null;
    switch (data.type) {
        case 'Input':
            component = new Input()
            break;
        case 'Textarea':
            component = new Textarea()
            break;
        case 'Caption':
            component = new Caption()
            break;
        case 'Number':
            component = new Number()
            break;
        case 'Switch':
            component = new Switch()
            break;
        case 'Radio':
            component = new Radio()
            break; 
        case 'Checkbox':
            component = new Checkbox()
            break;   
        case 'Date':
            component = new Date();
            break;
        case 'DateRange':
            component = new DateRange();
            break;
        case 'UploadImg':
            component = new UploadImg()
            break;
        case 'Attachment':
            component = new Attachment()
            break;  
        case 'Amount':
            component = new Amount()
            break; 
        case 'CFormula':
            component = new CFormula()
            break;   
        case 'Account':
            component = new Account()
            break; 
        case 'Approval':
            component = new Approval()
            break;                 
        case 'Contact':
            component = new Contact()
            break; 
         case 'Department':
            component = new Department()
            break; 
        case 'Details':
            component = new Details()
            break; 
    }
    // 组件对象数据返回
    return component
}

/**
 * @description 深度拷贝
 * @method ObjDeepCopy
 * @param { Object } source 原始数据
 * @return { Object } 返回 拷贝过后的数据
 * */
export const ObjDeepCopy = source => {
    let sourceCopy = source instanceof Array ? [] : {};
    if(!source) sourceCopy = source
    for (let item in source) {
        sourceCopy[item] = typeof source[item] === 'object' ? ObjDeepCopy(source[item]) : source[item];
    }
    return sourceCopy;
}

/**
 * @description 验证计算公式是否合规
 * @method IsValidateForFormnla
 * @param { String } string 计算公式字符串
 * @param { Array } list 计算对象数组
 * @return { Boolean } 返回 是否合规
 * */
export const IsValidateForFormnla = (string, list) => {

    console.log(string, list)
    // 剔除空白符
    string = string.replace(/\s/g, '')

    // 错误情况 出现0开头的整数
    let str = string
    str = str.replace(/[\+\-×÷\(\)]/g, ',')
    let strArr = str.split(',')
    for(let i = 0, item; i < strArr.length; i++) {
        item = strArr[i]
        if(/^0[0-9]+$/.test(item)) return false
    }
    
    // 错误情况，空字符串
    if("" === string) return false
    
    // 错误情况，小数点前面没有数字
    if(/[^\d]\./g.test(string)) return false

    // 运算符号不能在首末位
    if(/^[\+\-×÷\.]|[\+\-×÷\.]$/.test(string)) return false
    
    // 错误情况，不能出现连续的小数点
    if(/([0-9]+\.){2,}/g.test(string)) return false
    
    // 错误情况，运算符连续
    if(/[\+\-×÷\.]{2,}/.test(string)) return false
    
    // 空括号
    if(/\(\)/.test(string)) return false
    
    // 错误情况，括号不配对
    let stack = []
    for(let i = 0, item; i < string.length; i++){
        item = string.charAt(i);
        if('(' === item){
            stack.push('(')
        } else if(')' === item){
            if(stack.length > 0){
                stack.pop()
            }else{
                return false
            }
        }
    }
    if(0 !== stack.length) return false

    // 错误情况，(后面是运算符 
    if(/\([\+\-×÷\.]/.test(string)) return false
    
    // 错误情况，)前面是运算符
    if(/[\+\-×÷\.]\)/.test(string)) return false
    
    // 错误情况，(前面不是运算符
    if(/[^\+\-×÷]\(/.test(string)) return false
    
    // 错误情况，)后面不是运算符
    if(/\)[^\+\-×÷]/.test(string)) return false
    
    // 错误情况，使用除()+-*/之外的字符
    if(/[^\+\-×÷0-9\.A-Z_\(\)]/.test(string)) return false

    // 错误情况，计算对象 与 数字对象之间需要运算符链接
    for(let i = 0, item; i < list.length; i++) {
        item = list[i]
        let reg = new RegExp(`[^\\+\\-×÷\\(](${item})|(${item})[^\\+\\-×÷\\)]`)
        if(reg.test(string)) return false
    }

    return true
}