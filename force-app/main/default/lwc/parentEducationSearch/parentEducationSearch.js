import { LightningElement, track } from 'lwc';
import getUserRoles from '@salesforce/apex/RemainEducationController.getUserRoles';
import getAllEmployeeRemain from '@salesforce/apex/RemainEducationController.getAllEmployeeRemain';
import getAllEmployeeInProgress from '@salesforce/apex/RemainEducationController.getAllEmployeeInProgress';
import getRemainEducation from '@salesforce/apex/RemainEducationController.getRemainEducation';
import getInProgressEducation from '@salesforce/apex/RemainEducationController.getInProgressEducation';
import getName from '@salesforce/apex/RemainEducationController.getName';
import getAllMenteeRemain from '@salesforce/apex/RemainEducationController.getAllMenteeRemain';
import getAllMenteeInProgress from '@salesforce/apex/RemainEducationController.getAllMenteeInProgress';

export default class parentEducationSearch extends LightningElement {
    @track isRole = false;
    @track isCheck = false;
    @track isMentor = false;

    @track objName = '';
    @track data = [];
    @track columns = [];
    @track data2 = [];
    @track columns2 = [];
    @track sortedBy;
    @track sortDirection = 'asc';

    defaultSortDirection = 'asc';

    valueCategory='';
    valueProgram='';
    valueEmployee='';
    

    displayData=[];
    displayData2=[];

    connectedCallback() {
        this.initializeComponent();
    }

    initializeComponent() {
        //사용자의 role 체크하기
        getUserRoles()
            .then((roles) => {
                this.isRole = roles.isMainRole;
                this.isCheck = roles.isCheck;
                this.isMentor = roles.isMentor;

                if (this.isRole) {
                    this.fetchAllEmployeeData();
                } else if (this.isCheck) {
                    this.fetchUserData();
                } else if (this.isMentor) {
                    this.fetchMentorData();
                }
            })
            .catch((error) => {
                console.error('Error fetching roles:', error);
            });
    }

    //모든 신입의 프로그램 가져오기
    fetchAllEmployeeData() {
        //모든 신입의 남은 프로그램 가져오기
        getAllEmployeeRemain()
            .then((result) => {
                console.log('before data: '+JSON.stringify(result));
                this.data = result.map((program) => ({
                    id: program.id,
                    programName: program.programName,
                    category: program.category,
                    employeeNames: program.employeeNames.join(', ')
                }));
                this.columns = [
                    { label: '관련분야', fieldName: 'category', type: 'text', sortable: true },
                    { label: '프로그램 명', fieldName: 'programName', type: 'text', sortable: true },
                    { label: '사원 명', fieldName: 'employeeNames', type: 'text', sortable: true }
                ];

                console.log('data: '+JSON.stringify(this.data));
                this.displayData=this.data;
            })
            .catch((error) => {
                console.error('Error fetching remaining programs:', error);
            });

        // 모든 신입의 진행 중 프로그램 가져오기
        getAllEmployeeInProgress()
            .then((result) => {
                this.data2 = result.map((program) => ({
                    id: program.id,
                    programName: program.programName,
                    category: program.category,
                    employeeNames: program.employeeNames.join(', ')
                }));
                this.columns2 = [
                    { label: '관련분야', fieldName: 'category', type: 'text', sortable: true },
                    { label: '프로그램 명', fieldName: 'programName', type: 'text', sortable: true },
                    { label: '사원 명', fieldName: 'employeeNames', type: 'text', sortable: true }
                ];

                this.displayData2=this.data2;
            })
            .catch((error) => {
                console.error('Error fetching in-progress programs:', error);
            });
    }
    //남은 프로그램 카드 제목 
    get getRemainTitle() {
        return this.objName+ ' 님 미진행 프로그램';
    }

    //진행 중 프로그램 카드 제목
    get getInProgressTitle(){
        return this.objName+ ' 님 진행 중/완료 프로그램';
    }

    //개인유저 프로그램 가져오기
    fetchUserData() {
        //이름 가져오기
        getName()
            .then((result) =>{
                this.objName=result;
                console.log('objName: '+this.objName);
            })
            .catch((error) => {
                console.error('Error fetching name:', error);
            });


        //남아있는 프로그램 가져오기    
        getRemainEducation()
            .then((result) => {
                this.data = result;
                this.columns = [
                    { label: '관련분야', fieldName: 'category', type: 'text', sortable: true },
                    { label: '프로그램 명', fieldName: 'programName', type: 'text', sortable: true }
                ];

                this.displayData=this.data;
            })
            .catch((error) => {
                console.error('Error fetching user remaining programs:', error);
            });

        //진행 중 프로그램 가져오기
        getInProgressEducation()
            .then((result) => {
                this.data2 = result;
                this.columns2 = [
                    { label: '관련분야', fieldName: 'category', type: 'text', sortable: true },
                    { label: '프로그램 명', fieldName: 'programName', type: 'text', sortable: true }
                ];

                this.displayData2=this.data2;
            })
            .catch((error) => {
                console.error('Error fetching user in-progress programs:', error);
            });
    }

    //멘토인 경우 멘티들의 프로그램 가져오기
    fetchMentorData() {
        // 멘티의 남아있는 프로그램 가져오기
        getAllMenteeRemain()
        .then((result) => {
            this.data = result.map((program) => ({
                id: program.id,
                programName: program.programName,
                category: program.category,
                employeeNames: program.employeeNames.join(', ')
            }));
            this.columns = [
                { label: '관련분야', fieldName: 'category', type: 'text', sortable: true },
                { label: '프로그램 명', fieldName: 'programName', type: 'text', sortable: true },
                { label: '사원 명', fieldName: 'employeeNames', type: 'text', sortable: true }
            ];

            this.displayData=this.data;
        })
        .catch((error) => {
            console.error('Error fetching remaining programs:', error);
        });

        // 멘티의 진행 중 프로그램 가져오기
        getAllMenteeInProgress()
        .then((result) => {
            this.data2 = result.map((program) => ({
                id: program.id,
                programName: program.programName,
                category: program.category,
                employeeNames: program.employeeNames.join(', ')
            }));
            this.columns2 = [
                { label: '관련분야', fieldName: 'category', type: 'text', sortable: true },
                { label: '프로그램 명', fieldName: 'programName', type: 'text', sortable: true },
                { label: '사원 명', fieldName: 'employeeNames', type: 'text', sortable: true }
            ];

            this.displayData2=this.data2;
        })
        .catch((error) => {
            console.error('Error fetching in-progress programs:', error);
        });
    }

    //정렬핸들러
    handleSort(event) {
        const { fieldName: sortedBy, sortDirection } = event.detail;
        const cloneData1 = [...this.displayData];
        const cloneData2 = [...this.displayData2];
        //console.log('cloneData' + JSON.stringify(cloneData));

        cloneData1.sort(this.sortBy(sortedBy, sortDirection == 'asc' ? 1 : -1));
        cloneData2.sort(this.sortBy(sortedBy, sortDirection == 'asc' ? 1 : -1));
        this.displayData = cloneData1;
        this.displayData2 = cloneData2;
        this.sortDirection = sortDirection;
        this.sortedBy = sortedBy;
    }

    //정렬함수
    sortBy(field, reverse){
        return (a,b) =>{
            let valueA=a[field] ??'';
            let valueB=b[field] ??'';
            
            if(valueA>valueB){
                return reverse;
            }else if(valueA<valueB){
                return -reverse;
            }
            return 0;
        };
    }

    handleSearch(event) {
        const { category, program, employee } = event.detail;
        this.valueCategory=category;
        this.valueProgram=program;
        this.valueEmployee=employee;
        console.log(`category: ${category} program: ${program} employee: ${employee}`);

        this.filterData();
    }

    filterData() {
        if (!this.valueCategory && !this.valueProgram && !this.valueEmployee) {
            // 모든 검색 조건이 비어있으면 전체 데이터 표시
            this.displayData = this.data;
            this.displayData2 = this.data2;
            return;
        }
    
        this.displayData = this.data
            .map(item => {
                const categoryMatch = !this.valueCategory || 
                    item.category.toLowerCase().includes(this.valueCategory.toLowerCase());
                const programMatch = !this.valueProgram || 
                    item.programName.toLowerCase().includes(this.valueProgram.toLowerCase());
    
                // employeeNames 필터링
                const filteredEmployeeNames = !this.valueEmployee
                    ? item.employeeNames
                    : item.employeeNames
                        .split(',') //콤마 분리
                        .map(name => name.trim()) // 공백 제거
                        .filter(name => name.toLowerCase().includes(this.valueEmployee.toLowerCase())); // 입력값을 포함하는지 매칭
    
                // 조건에 맞는 직원 이름이 없다면 제외
                if (!categoryMatch || !programMatch || filteredEmployeeNames.length === 0) {
                    return null;
                }
    
                // 조건에 맞는 데이터를 새로운 employeeNames로 재구성
                return { ...item, employeeNames: filteredEmployeeNames.join(', ') };
            })
            .filter(item => item !== null); // null 값 제거
    
        this.displayData2 = this.data2
            .map(item => {
                const categoryMatch = !this.valueCategory || 
                    item.category.toLowerCase().includes(this.valueCategory.toLowerCase());
                const programMatch = !this.valueProgram || 
                    item.programName.toLowerCase().includes(this.valueProgram.toLowerCase());
    
                console.log('item: ' + JSON.stringify(item));
                console.log('item.employeeNames: ' + item.employeeNames);
    
                // employeeNames 필터링
                const filteredEmployeeNames = !this.valueEmployee
                    ? item.employeeNames
                    : item.employeeNames
                        .split(',')
                        .map(name => name.trim())
                        .filter(name => name.toLowerCase().includes(this.valueEmployee.toLowerCase()));
    
                console.log('Filtered Names: ' + filteredEmployeeNames);
    
                // 조건에 맞는 직원 이름이 없다면 제외
                if (!categoryMatch || !programMatch || filteredEmployeeNames.length === 0) {
                    return null;
                }
    
                // 조건에 맞는 데이터를 새로운 employeeNames로 재구성
                return { ...item, employeeNames: filteredEmployeeNames.join(', ') };
            })
            .filter(item => item !== null); // null 값 제거
    }
    

    handleRefresh(){

        this.displayData=this.data;
        this.displayData2=this.data2;
    }

    
}
