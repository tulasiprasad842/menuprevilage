import { Component, OnInit, Inject } from '@angular/core';
import { IGetUser, IMenu, FileNode, TreeNode} from '../_model/IUsers';
import {  MAT_DIALOG_DATA, MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material';
import { ITokenInfo, AppConfig, IUserUpdateDto } from '../../_helpers/app.config';
import { UsersService } from '../_service/users.service';
import { BehaviorSubject, of as observableOf } from 'rxjs';
import { FlatTreeControl } from '@angular/cdk/tree';
import { SelectionModel } from '@angular/cdk/collections';
import { TranslateService } from '@ngx-translate/core';
import { ActionType, AlertMessageService } from '../../_services/alertMessageService';
import { Router } from '@angular/router';



@Component({
  selector: 'app-menuprevilage',
  templateUrl: './menuprevilage.component.html',
  styleUrls: ['./menuprevilage.component.scss'],

})
export class MenuprevilageComponent implements OnInit {
  _tokenInfo: IUserUpdateDto;
  menuitems: IMenu[] = [];
  loading: boolean = false;
  // menuPrevData: FileNode[]=[]
  treeControl: FlatTreeControl<TreeNode>;
    dataChange: BehaviorSubject<FileNode[]> = new BehaviorSubject<FileNode[]>([]);


  treeFlattener: MatTreeFlattener<FileNode, TreeNode>;

  dataSource: MatTreeFlatDataSource<FileNode, TreeNode>;

  checklistSelection = new SelectionModel<TreeNode>(true);
  constructor(private alertMessage: AlertMessageService,
    private translate: TranslateService, private profileService: UsersService, private router: Router, 
    private appConfig: AppConfig, @Inject(MAT_DIALOG_DATA) private userdata: IGetUser, ) {
      let tokenData = this.appConfig.getTokenInfo() as ITokenInfo;
      if (tokenData)
        this._tokenInfo = tokenData.tokenSub;
      else {
        this.router.navigate(['401']);
      }
     
    }


   getMenuByRoleId() {
      console.log("getUserRoleMenuInfoWithId-Request==>", this.userdata.roles[0].roleId);
  
      this.profileService.getUserRoleMenuInfoWithId(this.userdata.roles[0].roleId).subscribe((response: IMenu[]) => {
        console.log("getUserRoleMenuInfoWithId-Response=>", response);
        if (response.length>0) {
          this.menuitems = response;
          this.treeControl = new FlatTreeControl<TreeNode>(this.getLevel, this.isExpandable);
          this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
          this.dataSource.data=this.menuitems;
          console.log("menuitems==>", this.menuitems);
          
    
          
        }
        
        else {
          this.menuitems = [];
          this.loading = false;
        } error => {
          let message = error.error.messages as string
          let errorMessage = error.status == 404 ? this.translate.instant('ActionNames.errorResponse') : message ? message : error.message;
          console.error("CreateRoomType_Error ", JSON.stringify(error));
          this.showAlert(errorMessage, ActionType.ERROR, error.status);
          this.loading = false;
        }
      })
    }



    ngOnInit(){
      this.getMenuByRoleId();
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren);

      this.treeControl = new FlatTreeControl<TreeNode>(this.getLevel, this.isExpandable);
      this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
 
     
    }

    transformer(node: FileNode, level: number) {
      return {
        name: node.name,
        type:node.type,
        level: level,
        expandable: !!node.submenu
      };
    }
  
    getLevel(node: TreeNode) {
      return node.level;
    }
  
    isExpandable(node: TreeNode) {
      return node.expandable;
    };
  
    getChildren(node: FileNode) {
      return observableOf(node.submenu);
    }
  
    hasChild(index: number, node: TreeNode){
      return node.expandable;
    }

    descendantsAllSelected(node: TreeNode): boolean {
      const descendants = this.treeControl.getDescendants(node);
      return descendants.every(child => this.checklistSelection.isSelected(child));
    }
    descendantsPartiallySelected(node: TreeNode): boolean {
      const descendants = this.treeControl.getDescendants(node);
      const result = descendants.some(child => this.checklistSelection.isSelected(child));
      return result && !this.descendantsAllSelected(node);
    }
    todoItemSelectionToggle(node: TreeNode): void {
      this.checklistSelection.toggle(node);
      const descendants = this.treeControl.getDescendants(node);
      this.checklistSelection.isSelected(node)
        ? this.checklistSelection.select(...descendants)
        : this.checklistSelection.deselect(...descendants);
    }


        showAlert(error: any, action: ActionType, status: number = 0) {
          if (status == 401)
            this.router.navigate(['401']);
          else setTimeout(() => this.alertMessage.showAlert(error, action));
        }


        
        menuSubmit() {
     
    console.log('checklistSelection=>', this.checklistSelection);
  }

      
}