import json

with open('sortedBusProfiles.json', 'r') as f:
    data = json.load(f)
    for key in data.keys():
        super_set_of = data[key]['isSupersetOf']
        temp_super_set = set()
        for sub_code in super_set_of:
            sub_code_super_set_of = data[sub_code].get('isSupersetOf', [])
            for sub_sub_code in sub_code_super_set_of:
                if sub_sub_code not in super_set_of:
                    temp_super_set.add(sub_sub_code)
                sub_sub_code_super_set_of = data[sub_sub_code].get('isSupersetOf', [])
                for sss_code in sub_sub_code_super_set_of:
                    if sss_code not in super_set_of:
                        temp_super_set.add(sss_code)
                    if data.get(sss_code, False) is not False:
                        sss_code_super_set_of = data[sss_code].get('isSupersetOf', [])
                        for s_four_code in sss_code_super_set_of:
                            if s_four_code not in super_set_of:
                                temp_super_set.add(s_four_code)
        
        data[key]['isSupersetOf'] = super_set_of + list(temp_super_set)

    with open('newFile.json', 'w') as f:
        json.dump(data, f)