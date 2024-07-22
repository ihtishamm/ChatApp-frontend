import AnimatedMultiSelect from "../Custom/AnimatedSelect";
import Model from "./Model";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface GroupModelProps {
    isOpen: boolean;
    onClose: () => void;
    }

const GroupModel: React.FC<GroupModelProps> = ({
    isOpen,onClose
}) => {
  return (
     <Model
       isOpen={isOpen}
         onClose={onClose}
     >
            <form onSubmit={() => {}}>
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-4">
                 <h2 className="text-lg font-semibold leadig-7 text-grey-900">
                    Create a new group
                 </h2>
                 <div className="mt-10 flex flex-col gap-y-8 ">
                    <div>
                    <label htmlFor="group-name" className="block text-lg font-medium leading-6 text-gray-900 mb-2">Group Name </label>   
                     <Input/>
                     </div>
                     <div>
                     <h2 className="block text-lg font-medium leading-6 text-gray-900 mb-2">
                        Add Members
                     </h2>
                     <AnimatedMultiSelect/>
                     </div>
                       
                 </div>
                </div>
              </div>

                 <div className="mt-6 flex items-center justify-end gap-x-6">
                   <Button
                        variant="outline"
                        onClick={onClose} type="button"> Cancel</Button>
                   
                
                    <Button
                    variant="default" className="color-red">Create</Button>
                    
                 </div>
               
            </form>
     </Model>
  );
}

export default GroupModel;