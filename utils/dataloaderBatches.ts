export{}
export const batchNotes = async (keys: string[], Note: any) => {
    console.log('bätsi', keys)
    const notes = await Note.find({ _id: { '$in': keys } })
    const noteMap: { [key: string]:any} = {};
    notes.forEach((n:any) => {
      noteMap[n.id] = n;
    });
    return keys.map(k =>noteMap[k]);
}